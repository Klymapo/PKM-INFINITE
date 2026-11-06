#!/usr/bin/env python3
"""Lector narrativo externo/local: Qwen3 4B (Apache-2.0). Sin servicios de pago ni datos de usuario.
Revisa íntegramente los guiones de la propuesta aislada, divididos por tramos.
El reporte puede contener SPOILERS; no publicar respuestas de historia en la conversación.
"""
import json, os, re, subprocess, sys, urllib.request
from pathlib import Path

ROOT=Path(__file__).resolve().parents[2]
SCRIPTS=ROOT/"propuestas/chatgpt/misiones/cg-carga-johto-completo.js"
OUT=ROOT/"propuestas/chatgpt/REVISION-LECTOR-LOCAL-T0-T7-2026-11-05.md"
BASE={
 0:["cg_carga_inicio","cg_carga_yasmina_espera","cg_carga_etiqueta","cg_carga_bascula","cg_carga_libro","cg_carga_inferencia","cg_carga_olivo_decision","cg_carga_cierre_olivo","cg_carga_recordatorio_olivo"],
 1:["cg_carga_patio","cg_carga_horario","cg_carga_testigo","cg_carga_precinto","cg_carga_orden","cg_carga_cierre_trigal","cg_carga_recordatorio_trigal"],
 2:["cg_carga_iris_inicio","cg_carga_guia_camino","cg_carga_guia_relevo","cg_carga_guia_sello","cg_carga_cotejo_iris","cg_carga_iris_despues"],
 3:["cg_carga_caoba_inicio","cg_carga_huellas","cg_carga_rejilla","cg_carga_plantas","cg_carga_wooper","cg_carga_wooper_cierre","cg_carga_caoba_despues"],
 4:["cg_carga_prueba_inicio","cg_carga_prueba_peso","cg_carga_prueba_sello","cg_carga_prueba_hora","cg_carga_prueba_conclusion"],
 5:["cg_carga_turno_inicio","cg_carga_entreplanta","cg_carga_guardia","cg_carga_firmas","cg_carga_encargado","cg_carga_turno_cierre"],
 6:["cg_carga_recibo_inicio","cg_carga_recibo_hojas","cg_carga_recibo_tinta","cg_carga_recibo_casilla","cg_carga_recibo_deduccion","cg_carga_recibo_decision","cg_carga_recibo_cierre"],
 7:["cg_carga_entrega_inicio","cg_carga_entrega_trigal","cg_carga_entrega_iris","cg_carga_entrega_caoba","cg_carga_entrega_final","cg_carga_fin","cg_carga_cap_claim","cg_carga_epilogo","cg_carga_trigal_despues","cg_carga_iris_final","cg_carga_caoba_final"]
}

def to_text(x, level=0):
    if level>12: return ""
    if isinstance(x,str):
        return x if len(x)>2 else ""
    if isinstance(x,list):
        return "\n".join(filter(None,(to_text(a,level+1) for a in x)))
    if not isinstance(x,dict): return ""
    parts=[]
    if 'if' in x: parts.append("[SI "+str(x['if'])+"]")
    if 'cond' in x: parts.append("[COND "+str(x['cond'])+"]")
    if 'say' in x:
        parts.append(str(x['say'])+": "+str(x.get('text','')))
    elif 'diary' in x:
        parts.append("DIARIO: "+str(x['diary']))
    elif 'text' in x:
        parts.append(str(x['text']))
    if 'set' in x: parts.append("[DECISIÓN "+", ".join(x['set'].keys())+"]")
    if 'choice' in x:
        for v in x['choice']:
            parts.append("OPCIÓN: "+str(v.get('text','')))
            parts.append(to_text(v.get('then',[]),level+1))
    for k in ['then','else','onWin','onLose','onQuit','onSolve']:
        if k in x: parts.append(to_text(x[k],level+1))
    return "\n".join(filter(None,parts))

def fetch_scripts():
    js="import data from './propuestas/chatgpt/misiones/cg-carga-johto-completo.js'; console.log(JSON.stringify(data.scripts));"
    p=subprocess.run(['node','--input-type=module','-e',js],cwd=ROOT,text=True,capture_output=True,timeout=30)
    if p.returncode: raise RuntimeError(p.stderr[-2000:])
    return json.loads(p.stdout)

def invoke(model,prompt):
    body=json.dumps({"model":model,"prompt":prompt,"stream":False,"think":False,"options":{"temperature":0.15,"num_ctx":8192,"num_predict":490,"num_thread":4}}).encode()
    req=urllib.request.Request('http://127.0.0.1:11434/api/generate',data=body,headers={'Content-Type':'application/json'})
    with urllib.request.urlopen(req,timeout=900) as ans:
        value=json.loads(ans.read())
    return str(value.get('response','')).strip()

def main():
    model=os.getenv('LECTOR_MODELO','qwen3:4b')
    scripts=fetch_scripts()
    ids=set()
    parts=["# ⚠️ INFORME CON SPOILERS — Lector automatizado independiente de la autoría\n",
      "Modelo local: **"+model+"** (pesos abiertos, sin API externa ni cobro por token). "
      "Revisor separado del autor en GitHub Actions; **no sustituye a un lector humano**. "
      "Las observaciones requieren contraste con el guion; un modelo puede equivocarse.\n",
      "## Método\n",
      "Guiones T0–T7 importados de la rama de revisión, incluida la voz adaptada de Rotom. "
      "Se revisaron fragmentos completos por script, sin enviar los textos a servicios externos. "
      "Criterios: causalidad, continuidad de personajes, voz, ritmo/redundancias, consecuencias y cierre.\n"]
    total_calls=0
    for n in range(8):
        keys=[k for k in scripts if k.startswith(f'cg_carga_t{n}_')] + [k for k in BASE[n] if k in scripts]
        keys=list(dict.fromkeys(keys))
        ids.update(keys)
        entries=[(k,"ESCENA "+k+"\n"+to_text(scripts[k])) for k in keys]
        chunks=[];cur=[];size=0
        for key,raw in entries:
            if cur and size+len(raw)>12500:
                chunks.append(cur);cur=[];size=0
            # Divide escenas excepcionalmente largas para no truncarlas en la ventana.
            if len(raw)>12500:
                if cur: chunks.append(cur);cur=[];size=0
                for i in range(0,len(raw),10500): chunks.append([(key,raw[i:i+10500])])
                continue
            cur.append((key,raw));size+=len(raw)
        if cur:chunks.append(cur)
        parts.append(f"\n## Tramo T{n} — {len(keys)} guiones; {len(chunks)} lotes\n")
        for ci,group in enumerate(chunks,1):
            prompt=(
            "Eres un REVISOR EDITORIAL INDEPENDIENTE, no el autor. Lee los fragmentos "
            "de un RPG narrativo en español. La historia es paralela; no debe cambiar el canon. "
            "Búscame hasta CUATRO problemas concretos verificables en: "
            "(1) causalidad y continuidad; (2) voces y diálogo repetitivo; "
            "(3) elecciones con consecuencias; (4) lógica de pistas, obstáculos y ritmo. "
            "Cita IDs exactos de los guiones cuando sea posible, incluye una frase corta como evidencia, "
            "separa error GRAVE de sugerencia EDITORIAL, y señala qué sí funciona. "
            "No inventes personajes ni conclusiones fuera del fragmento. "
            "Si no hay problemas concretos di 'SIN HALLAZGO VERIFICABLE'. "
            "No redactes el final ni reescribas una trama distinta.\n\n"
            f"TRAMO T{n}; fragmento {ci}/{len(chunks)}\n"+'\n\n'.join(raw for _,raw in group)
            )
            result=invoke(model,prompt)
            parts.append(f"### Lote {ci}/{len(chunks)} — {', '.join(k for k,_ in group)}\n\n{result}\n")
            total_calls+=1
            print(f"REVISOR T{n} {ci}/{len(chunks)}: "+re.sub(r'\s+',' ',result)[:380],flush=True)
    # El lector también comprueba coherencia global, a partir de sus propios hallazgos.
    notes="\n".join(parts[-60:])
    endprompt=("Eres un editor narrativo independiente. A partir de estos reportes por tramo "
      "escribe un dictamen global breve con: a) 3 fortalezas, b) hasta 5 defectos "
      "verificables del conjunto, c) prioridades de corrección. "
      "No conviertas sugerencias en errores sin evidencia; advierte que no eres un humano. "
      "No inventes historias que no aparezcan aquí. \n"+notes[-19000:])
    overall=invoke(model,endprompt)
    parts.insert(4,"## Dictamen global de lectura externa\n\n"+overall+"\n")
    parts.append(f"\n## Cobertura\n\n{len(ids)} guiones únicos revisados en {total_calls} solicitudes locales al modelo.\n")
    OUT.write_text("\n".join(parts),encoding='utf-8')
    print("RESULTADO INDEPENDIENTE:\n"+overall,flush=True)
    print(f"REPORTE: {OUT}; {len(ids)} guiones; {total_calls} lotes",flush=True)

if __name__=='__main__':
    main()
