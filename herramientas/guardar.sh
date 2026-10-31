#!/usr/bin/env bash
# Guardado parcial en un paso: commit + push a la rama actual + fetch de la referencia remota.
#
# Uso:
#   herramientas/guardar.sh [opciones] [mensaje] [rutas…]
#
#   mensaje   Qué tipo de cambio es, SIN spoilers (CLAUDE.md §0). Se le añade « (guardado parcial)».
#             Por defecto: «Trabajo en curso».
#   rutas     Solo se guardan esas rutas. Sin rutas, se guarda todo lo modificado y lo nuevo, salvo:
#               · secreto/auditorias/*-<hoy>.md (informes de detalle de la auditoría de hoy)
#               · secreto/registro-auto.md
#             que se apartan durante el guardado y se devuelven a su sitio al terminar (nunca se borran).
#
# Opciones:
#   --firma "línea"   Línea de atribución al final del commit (repetible), p. ej.
#                     --firma "Co-Authored-By: …" --firma "Claude-Session: …"
#   --sin-firma       Commit sin líneas de atribución.
#   --sin-push        Solo commit (no push ni fetch).
#   -h, --help        Esta ayuda.
#
# La atribución también puede venir de la variable GUARDAR_FIRMA (una línea por renglón).
# Las líneas de atribución las da la sesión: no las codifiques aquí.
# Se niega a trabajar en main (los guardados parciales van en ramas; publicar es otra cosa: skill `publicar`).
set -euo pipefail

ayuda() { sed -n '2,/^set -euo/p' "$0" | sed '$d' | sed 's/^# \{0,1\}//'; }
fallo() { echo "✖ guardar: $*" >&2; exit 1; }

FIRMAS=() SIN_FIRMA=0 PUSH=1 POS=()
while [ $# -gt 0 ]; do
	case "$1" in
		--firma) [ $# -ge 2 ] || fallo "--firma necesita un texto"; FIRMAS+=("$2"); shift 2 ;;
		--firma=*) FIRMAS+=("${1#--firma=}"); shift ;;
		--sin-firma) SIN_FIRMA=1; shift ;;
		--sin-push) PUSH=0; shift ;;
		-h|--help) ayuda; exit 0 ;;
		--) shift; POS+=("$@"); break ;;
		*) POS+=("$1"); shift ;;
	esac
done
if [ ${#FIRMAS[@]} -eq 0 ] && [ -n "${GUARDAR_FIRMA:-}" ]; then
	while IFS= read -r l; do [ -n "$l" ] && FIRMAS+=("$l"); done <<< "$(printf '%b' "$GUARDAR_FIRMA")"
fi
[ ${#FIRMAS[@]} -gt 0 ] || [ $SIN_FIRMA -eq 1 ] || fallo "faltan las líneas de atribución: pásalas con --firma \"…\" (repetible) o en GUARDAR_FIRMA, o usa --sin-firma"

RAIZ=$(git rev-parse --show-toplevel 2>/dev/null) || fallo "no estás dentro de un repo git"
cd "$RAIZ"
RAMA=$(git symbolic-ref --quiet --short HEAD) || fallo "HEAD está suelto (detached): cámbiate a una rama de trabajo"
case "$RAMA" in main|master) fallo "estás en $RAMA: el guardado parcial nunca va a main. Crea una rama (git switch -c trabajo/…)";; esac

MSG="${POS[0]:-Trabajo en curso}"
RUTAS=("${POS[@]:1}")
case "$MSG" in *"(guardado parcial)") ;; *) MSG="$MSG (guardado parcial)";; esac

HOY=$(TZ=America/Mexico_City date +%F)
APARTE=""
excluido() { case "$1" in secreto/registro-auto.md|secreto/auditorias/*-"$HOY".md) return 0;; esac; return 1; }

# Devuelve lo apartado a su sitio (siempre, también si algo falla a medias).
# rastreados/: copias de archivos con cambios que se dejaron como en HEAD → vuelven tal cual.
# nuevos/: archivos sin seguir que se movieron → si el remoto trajo uno con el mismo nombre, el tuyo queda en .mio.
devolver() {
	[ -n "$APARTE" ] && [ -d "$APARTE" ] || return 0
	local f rel destino tipo
	for tipo in rastreados nuevos; do
		[ -d "$APARTE/$tipo" ] || continue
		while IFS= read -r -d '' f; do
			rel=${f#"$APARTE/$tipo"/}; destino="$RAIZ/$rel"
			mkdir -p "$(dirname "$destino")"
			if [ $tipo = nuevos ] && [ -e "$destino" ] && ! cmp -s "$f" "$destino"; then mv "$f" "$destino.mio"; echo "  · $rel ya existía (vino del remoto): tu versión queda en $rel.mio"
			else mv -f "$f" "$destino"; fi
		done < <(find "$APARTE/$tipo" -type f -print0)
	done
	rm -rf "$APARTE"
}
trap devolver EXIT

if [ ${#RUTAS[@]} -eq 0 ]; then
	# Todo lo modificado o nuevo, menos los informes de hoy que no van en un guardado parcial
	mapfile -d '' ESTADO < <(git status --porcelain=v1 -z -uall)
	i=0
	while [ $i -lt ${#ESTADO[@]} ]; do
		e=${ESTADO[$i]}; st=${e:0:2}; f=${e:3}; i=$((i + 1))
		if [[ $st == R* || $st == C* ]]; then RUTAS+=("${ESTADO[$i]}"); i=$((i + 1)); fi
		if excluido "$f"; then
			APARTE=${APARTE:-$(mktemp -d "${TMPDIR:-/tmp}/guardar-aparte.XXXXXX")}
			if [ "$st" = "??" ]; then mkdir -p "$APARTE/nuevos/$(dirname "$f")"; mv "$f" "$APARTE/nuevos/$f"
			elif [ -e "$f" ]; then mkdir -p "$APARTE/rastreados/$(dirname "$f")"; cp -p "$f" "$APARTE/rastreados/$f"; git restore --staged --worktree -- "$f" 2>/dev/null || git checkout -- "$f"
			else continue
			fi
			echo "  · apartado mientras se guarda: $f"
			continue
		fi
		RUTAS+=("$f")
	done
fi

if [ ${#RUTAS[@]} -eq 0 ]; then
	echo "· No hay cambios que guardar en $RAMA."
else
	git add -A -- "${RUTAS[@]}"
	# Solo esas rutas (aunque otro agente tenga cosas en el índice)
	if git diff --cached --quiet -- "${RUTAS[@]}"; then
		echo "· Las rutas indicadas no tienen cambios."
	else
		CUERPO="$MSG"
		if [ ${#FIRMAS[@]} -gt 0 ]; then CUERPO+=$'\n'; for l in "${FIRMAS[@]}"; do CUERPO+=$'\n'"$l"; done; fi
		git commit -q -m "$CUERPO" -- "${RUTAS[@]}"
		echo "✔ Commit $(git rev-parse --short HEAD) en $RAMA: $MSG ($(git show --stat --format= HEAD | tail -1 | sed 's/^ *//'))"
	fi
fi

[ $PUSH -eq 1 ] || exit 0
empujar() { git push -q origin "HEAD:refs/heads/$RAMA"; }
if ! empujar 2>/tmp/guardar-push.$$; then
	cat /tmp/guardar-push.$$ >&2
	echo "· El push se rechazó: traigo lo remoto (rebase) y lo intento otra vez"
	git pull -q --rebase --autostash origin "$RAMA" || { rm -f /tmp/guardar-push.$$; fallo "el rebase tuvo conflictos: resuélvelos (git status) y vuelve a ejecutar"; }
	empujar || { rm -f /tmp/guardar-push.$$; fallo "el push volvió a fallar"; }
fi
rm -f /tmp/guardar-push.$$
git fetch -q origin "$RAMA:refs/remotes/origin/$RAMA"
echo "✔ Subido a origin/$RAMA ($(git rev-parse --short "origin/$RAMA"))"
