// Serie candidata aditiva. Revisar antes de integrar.
export default {
  "npcs": {
    "cg_faroles_nerea": {
      "name": "Nerea",
      "title": "Artesana de faroles",
      "look": {
        "hair": "braids",
        "hairColor": "#65402f",
        "eyes": "#51807a",
        "outfit": "#b88046",
        "outfit2": "#ead8ab",
        "skin": 2,
        "acc": "freckles"
      }
    }
  },
  "items": {
    "cg_faroles_1_material_a": {
      "name": "Flotador del farol",
      "pocket": "key",
      "desc": "Material de la prueba de Nerea; no se vende ni se entrega a otro personaje."
    },
    "cg_faroles_1_material_b": {
      "name": "Medida del nivel del agua",
      "pocket": "key",
      "desc": "Recuerdo del montaje; la misión progresa por tareas realizadas, no por gastar este objeto."
    },
    "cg_faroles_1_recuerdo": {
      "name": "Nudo de la primera orilla",
      "pocket": "key",
      "desc": "Recuerdo legible de un ensayo compartido.",
      "read": "Nerea dejó una cuerda corta con dos lazadas. Una para sujetar la caja. La otra, dice Misty, para sujetar el orgullo."
    },
    "cg_faroles_2_material_a": {
      "name": "Cierre de recambio",
      "pocket": "key",
      "desc": "Material de la prueba de Nerea; no se vende ni se entrega a otro personaje."
    },
    "cg_faroles_2_material_b": {
      "name": "Cera vegetal preparada",
      "pocket": "key",
      "desc": "Recuerdo del montaje; la misión progresa por tareas realizadas, no por gastar este objeto."
    },
    "cg_faroles_2_recuerdo": {
      "name": "Nota de la bandeja",
      "pocket": "key",
      "desc": "Recuerdo legible de un ensayo compartido.",
      "read": "Bill dibujó una bandeja debajo del farol. Nerea añadió: «Primero lo útil. Después lo bonito». Ninguno tachó la frase del otro."
    },
    "cg_faroles_3_material_a": {
      "name": "Filtro del patio",
      "pocket": "key",
      "desc": "Material de la prueba de Nerea; no se vende ni se entrega a otro personaje."
    },
    "cg_faroles_3_material_b": {
      "name": "Soporte del patio",
      "pocket": "key",
      "desc": "Recuerdo del montaje; la misión progresa por tareas realizadas, no por gastar este objeto."
    },
    "cg_faroles_3_recuerdo": {
      "name": "Tarjeta del patio",
      "pocket": "key",
      "desc": "Recuerdo legible de un ensayo compartido.",
      "read": "La tarjeta de Sabrina solo dice: «La salida también forma parte de una invitación». Nerea dejó margen a ambos lados."
    },
    "cg_faroles_4_material_a": {
      "name": "Soporte abollado",
      "pocket": "key",
      "desc": "Material de la prueba de Nerea; no se vende ni se entrega a otro personaje."
    },
    "cg_faroles_4_material_b": {
      "name": "Cuerda recuperada",
      "pocket": "key",
      "desc": "Recuerdo del montaje; la misión progresa por tareas realizadas, no por gastar este objeto."
    },
    "cg_faroles_4_recuerdo": {
      "name": "Lazada reparada",
      "pocket": "key",
      "desc": "Recuerdo legible de un ensayo compartido.",
      "read": "La lazada conserva una hebra gastada del primer taller de Nerea. No sostiene peso: acompaña al soporte reparado."
    },
    "cg_faroles_5_material_a": {
      "name": "Cierre del recorrido",
      "pocket": "key",
      "desc": "Material de la prueba de Nerea; no se vende ni se entrega a otro personaje."
    },
    "cg_faroles_5_material_b": {
      "name": "Cubierta terminada",
      "pocket": "key",
      "desc": "Recuerdo del montaje; la misión progresa por tareas realizadas, no por gastar este objeto."
    },
    "cg_faroles_5_recuerdo": {
      "name": "Farol de ensayo",
      "pocket": "key",
      "desc": "Recuerdo legible de un ensayo compartido.",
      "read": "Una etiqueta con cuatro caligrafías: Nerea, Misty, Bill y Sabrina. El último espacio queda para ti."
    }
  },
  "quests": {
    "cg_faroles_1_quest": {
      "name": "La caja que navegó sola",
      "type": "side",
      "est": 18,
      "stages": {
        "inicio": "Ayuda a Nerea y a Misty a recuperar una caja de faroles junto al agua de Ciudad Celeste.",
        "investigar": "Completa las dos pruebas señaladas: Ciudad Celeste y Casa de Bill.",
        "reto": "Vuelve con Nerea en Ciudad Celeste para el ensayo. Puedes curarte y posponerlo.",
        "regreso": "Cierra el ensayo con Nerea en Ciudad Celeste. Recompensa: 300 monedas y un recuerdo de la serie.",
        "hecha": "Ensayo concluido. Puedes saludar a Nerea y continuar la siguiente parte desde el lugar indicado."
      },
      "parts": {
        "title": "Las dos pruebas",
        "items": [
          {
            "label": "Prueba del montaje",
            "where": "celeste",
            "done": "flag.cg_faroles_1_task_a",
            "hint": "Usa el punto «Prueba del montaje». Salir o fallar permite reintentar."
          },
          {
            "label": "Preparación complementaria",
            "where": "casa_bill",
            "done": "flag.cg_faroles_1_task_b",
            "hint": "Usa «Preparación complementaria» en este lugar."
          }
        ]
      }
    },
    "cg_faroles_2_quest": {
      "name": "Una luz que escucha",
      "type": "side",
      "est": 20,
      "stages": {
        "inicio": "Lleva el prototipo a la Casa de Bill y consigue bayas en Celeste para probar su cobertura.",
        "investigar": "Completa las dos pruebas señaladas: Casa de Bill y Ciudad Celeste.",
        "reto": "Vuelve con Nerea en Casa de Bill para el ensayo. Puedes curarte y posponerlo.",
        "regreso": "Cierra el ensayo con Nerea en Casa de Bill. Recompensa: 400 monedas y un recuerdo de la serie.",
        "hecha": "Ensayo concluido. Puedes saludar a Nerea y continuar la siguiente parte desde el lugar indicado."
      },
      "parts": {
        "title": "Las dos pruebas",
        "items": [
          {
            "label": "Prueba del montaje",
            "where": "casa_bill",
            "done": "flag.cg_faroles_2_task_a",
            "hint": "Usa el punto «Prueba del montaje». Salir o fallar permite reintentar."
          },
          {
            "label": "Preparación complementaria",
            "where": "celeste",
            "done": "flag.cg_faroles_2_task_b",
            "hint": "Usa «Preparación complementaria» en este lugar."
          }
        ]
      }
    },
    "cg_faroles_3_quest": {
      "name": "El patio sin aplausos",
      "type": "side",
      "est": 18,
      "stages": {
        "inicio": "Prueba con Sabrina el ritmo de los faroles en Azafrán y recoge un soporte en la Casa de Bill.",
        "investigar": "Completa las dos pruebas señaladas: Ciudad Azafrán y Casa de Bill.",
        "reto": "Vuelve con Nerea en Ciudad Azafrán para el ensayo. Puedes curarte y posponerlo.",
        "regreso": "Cierra el ensayo con Nerea en Ciudad Azafrán. Recompensa: 400 monedas y un recuerdo de la serie.",
        "hecha": "Ensayo concluido. Puedes saludar a Nerea y continuar la siguiente parte desde el lugar indicado."
      },
      "parts": {
        "title": "Las dos pruebas",
        "items": [
          {
            "label": "Prueba del montaje",
            "where": "azafran",
            "done": "flag.cg_faroles_3_task_a",
            "hint": "Usa el punto «Prueba del montaje». Salir o fallar permite reintentar."
          },
          {
            "label": "Preparación complementaria",
            "where": "casa_bill",
            "done": "flag.cg_faroles_3_task_b",
            "hint": "Usa «Preparación complementaria» en este lugar."
          }
        ]
      }
    },
    "cg_faroles_4_quest": {
      "name": "Lo que el agua devuelve",
      "type": "side",
      "est": 22,
      "stages": {
        "inicio": "Busca un soporte caído en Celeste y recupera la cuerda de prueba junto a la Casa de Bill.",
        "investigar": "Completa las dos pruebas señaladas: Ciudad Celeste y Casa de Bill.",
        "reto": "Vuelve con Nerea en Ciudad Celeste para el ensayo. Puedes curarte y posponerlo.",
        "regreso": "Cierra el ensayo con Nerea en Ciudad Celeste. Recompensa: 500 monedas y un recuerdo de la serie.",
        "hecha": "Ensayo concluido. Puedes saludar a Nerea y continuar la siguiente parte desde el lugar indicado."
      },
      "parts": {
        "title": "Las dos pruebas",
        "items": [
          {
            "label": "Prueba del montaje",
            "where": "celeste",
            "done": "flag.cg_faroles_4_task_a",
            "hint": "Usa el punto «Prueba del montaje». Salir o fallar permite reintentar."
          },
          {
            "label": "Preparación complementaria",
            "where": "casa_bill",
            "done": "flag.cg_faroles_4_task_b",
            "hint": "Usa «Preparación complementaria» en este lugar."
          }
        ]
      }
    },
    "cg_faroles_5_quest": {
      "name": "Un sitio bajo los faroles",
      "type": "side",
      "est": 25,
      "stages": {
        "inicio": "Completa el montaje en Celeste, recoge la cubierta en Azafrán y prueba el recorrido con Nerea.",
        "investigar": "Completa las dos pruebas señaladas: Ciudad Celeste y Ciudad Azafrán.",
        "reto": "Vuelve con Nerea en Ciudad Celeste para el ensayo. Puedes curarte y posponerlo.",
        "regreso": "Cierra el ensayo con Nerea en Ciudad Celeste. Recompensa: 700 monedas y un recuerdo de la serie.",
        "hecha": "Ensayo concluido. Puedes saludar a Nerea y continuar la siguiente parte desde el lugar indicado."
      },
      "parts": {
        "title": "Las dos pruebas",
        "items": [
          {
            "label": "Prueba del montaje",
            "where": "celeste",
            "done": "flag.cg_faroles_5_task_a",
            "hint": "Usa el punto «Prueba del montaje». Salir o fallar permite reintentar."
          },
          {
            "label": "Preparación complementaria",
            "where": "azafran",
            "done": "flag.cg_faroles_5_task_b",
            "hint": "Usa «Preparación complementaria» en este lugar."
          }
        ]
      }
    }
  },
  "scripts": {
    "cg_faroles_1_intro": [
      {
        "if": "!(visited(\"celeste\") && visited(\"azafran\") && visited(\"casa_bill\") && badges >= 8) || flag.cg_faroles_1_started",
        "then": [
          {
            "end": true
          }
        ]
      },
      {
        "quest": "cg_faroles_1_quest",
        "stage": "inicio"
      },
      {
        "say": "cg_faroles_nerea",
        "text": "Misty sostiene una cuerda. Nerea sostiene el extremo equivocado. Su caja de faroles acaba de zarpar sin ellas."
      },
      {
        "prompt": "¿Cómo probamos el rescate?",
        "choice": [
          {
            "text": "Recoger el flotador con la caña",
            "then": [
              {
                "set": {
                  "flag.cg_faroles_1_decision1_0": true
                }
              },
              {
                "say": "cg_faroles_nerea",
                "text": "Sin tirones: la caja también lleva cristal."
              }
            ]
          },
          {
            "text": "Ordenar una pasarela desde tierra",
            "then": [
              {
                "set": {
                  "flag.cg_faroles_1_decision1_1": true
                }
              },
              {
                "say": "cg_faroles_nerea",
                "text": "Mi especialidad: nudos. La tuya: comprobarlos."
              }
            ]
          }
        ]
      },
      {
        "set": {
          "flag.cg_faroles_1_started": true
        }
      },
      {
        "quest": "cg_faroles_1_quest",
        "stage": "investigar"
      }
    ],
    "cg_faroles_1_explore": [
      {
        "if": "!(flag.cg_faroles_1_started && !flag.cg_faroles_1_completed) || flag.cg_faroles_1_task_a",
        "then": [
          {
            "end": true
          }
        ]
      },
      {
        "if": "flag.cg_faroles_1_decision1_0",
        "then": [
          {
            "minigame": {
              "id": "cg_faroles_1_fish",
              "type": "fish",
              "title": "La prueba de Nerea",
              "level": 2,
              "theme": "rio",
              "hint": "Recoge el flotador sin dar tirones.",
              "guaranteed": [
                "cg_faroles_1_material_a"
              ],
              "picks": 0,
              "consolation": false
            },
            "onWin": [
              {
                "set": {
                  "flag.cg_faroles_1_task_a": true
                }
              },
              {
                "if": "flag.cg_faroles_1_task_a && flag.cg_faroles_1_task_b",
                "then": [
                  {
                    "set": {
                      "flag.cg_faroles_1_explored": true
                    }
                  },
                  {
                    "quest": "cg_faroles_1_quest",
                    "stage": "reto"
                  }
                ]
              }
            ],
            "onLose": [
              {
                "text": "No se perdió nada. Puedes repetir la prueba."
              }
            ],
            "onQuit": [
              {
                "text": "Puedes volver cuando quieras; nadie continuará sin ti."
              }
            ]
          }
        ]
      },
      {
        "if": "flag.cg_faroles_1_decision1_1",
        "then": [
          {
            "puzzle": {
              "id": "cg_faroles_1_puzzle",
              "title": "Abrir un paso seguro",
              "theme": "lab",
              "hint": "Coloca una caja sobre cada placa y llega a la salida. Puedes deshacer o reiniciar.",
              "grid": [
                "#######",
                "#P....#",
                "#..R..#",
                "#..S..#",
                "####D##",
                "#....G#",
                "#######"
              ]
            },
            "onSolve": [
              {
                "set": {
                  "flag.cg_faroles_1_task_a": true
                }
              },
              {
                "if": "flag.cg_faroles_1_task_a && flag.cg_faroles_1_task_b",
                "then": [
                  {
                    "set": {
                      "flag.cg_faroles_1_explored": true
                    }
                  },
                  {
                    "quest": "cg_faroles_1_quest",
                    "stage": "reto"
                  }
                ]
              }
            ],
            "onQuit": [
              {
                "text": "El montaje se queda como estaba. Puedes volver a intentarlo."
              }
            ]
          }
        ]
      }
    ],
    "cg_faroles_1_battle": [
      {
        "if": "!(flag.cg_faroles_1_started && !flag.cg_faroles_1_completed) || !flag.cg_faroles_1_explored || flag.cg_faroles_1_won",
        "then": [
          {
            "end": true
          }
        ]
      },
      {
        "say": "cg_faroles_nerea",
        "text": "Con la orilla despejada, Nerea propone ensayar cómo proteger el embarcadero durante un combate amistoso."
      },
      {
        "choice": [
          {
            "text": "Hacer el ensayo (curación antes y después)",
            "then": [
              {
                "heal": true
              },
              {
                "battle": "cg_faroles_1_trainer",
                "lose": "continue",
                "noLoss": true,
                "onWin": [
                  {
                    "heal": true
                  },
                  {
                    "set": {
                      "flag.cg_faroles_1_won": true
                    }
                  },
                  {
                    "quest": "cg_faroles_1_quest",
                    "stage": "regreso"
                  },
                  {
                    "set": {
                      "flag.cg_faroles_1_combat_won": true
                    }
                  }
                ],
                "onLose": [
                  {
                    "heal": true
                  },
                  {
                    "say": "cg_faroles_nerea",
                    "text": "Lo dejamos aquí. El ensayo sigue disponible; las tareas anteriores están guardadas."
                  }
                ]
              }
            ]
          },
          {
            "text": "Revisar las sujeciones sin combatir",
            "then": [
              {
                "text": "Misty comprueba el perímetro libre y Bill revisa el cierre. La alternativa no da premios de combate."
              },
              {
                "set": {
                  "flag.cg_faroles_1_ensayo_manual": true
                }
              },
              {
                "set": {
                  "flag.cg_faroles_1_won": true
                }
              },
              {
                "quest": "cg_faroles_1_quest",
                "stage": "regreso"
              }
            ]
          },
          {
            "text": "Volver después",
            "then": [
              {
                "text": "Nerea te guarda el sitio. Puedes ir al Centro, cambiar de equipo o seguir más tarde."
              }
            ]
          }
        ]
      }
    ],
    "cg_faroles_1_finish": [
      {
        "if": "!(flag.cg_faroles_1_started && !flag.cg_faroles_1_completed) || !flag.cg_faroles_1_won",
        "then": [
          {
            "end": true
          }
        ]
      },
      {
        "text": "La caja llega chorreando. Nerea agradece que nadie haya aplaudido su regreso. Misty aplaude una sola vez."
      },
      {
        "prompt": "¿Qué debe tener prioridad en los próximos faroles?",
        "choice": [
          {
            "text": "Señales que se vean desde lejos",
            "then": [
              {
                "set": {
                  "flag.cg_faroles_1_decision2_0": true
                }
              },
              {
                "say": "cg_faroles_nerea",
                "text": "Así vendrá gente que todavía no conoce la orilla."
              }
            ]
          },
          {
            "text": "Una luz tenue cerca de los refugios",
            "then": [
              {
                "set": {
                  "flag.cg_faroles_1_decision2_1": true
                }
              },
              {
                "say": "cg_faroles_nerea",
                "text": "Así los Pokémon podrán quedarse sin sentirse observados."
              }
            ]
          }
        ]
      },
      {
        "if": "flag.cg_faroles_1_decision1_0",
        "then": [
          {
            "say": "cg_faroles_nerea",
            "text": "Tu pulso ha dejado secos los papeles del fondo."
          }
        ]
      },
      {
        "if": "flag.cg_faroles_1_decision1_1",
        "then": [
          {
            "say": "cg_faroles_nerea",
            "text": "La pasarela aguanta incluso el salto triunfal de Nerea."
          }
        ]
      },
      {
        "say": "cg_faroles_nerea",
        "text": "Bill pidió ver el farol que sigue encendido bajo el agua. Nerea insiste en que no lo diseñó para eso."
      },
      {
        "give": "cg_faroles_1_recuerdo"
      },
      {
        "money": 300
      },
      {
        "give": "hyperpotion",
        "n": 1
      },
      {
        "say": "misty",
        "text": "El próximo ensayo empieza en Casa de Bill. Puedes dejarlo para cuando vuelvas."
      },
      {
        "quest": "cg_faroles_1_quest",
        "done": true
      },
      {
        "set": {
          "flag.cg_faroles_1_completed": true
        }
      }
    ],
    "cg_faroles_1_after": [
      {
        "if": "!flag.cg_faroles_1_completed",
        "then": [
          {
            "end": true
          }
        ]
      },
      {
        "if": "flag.cg_faroles_1_decision2_0",
        "then": [
          {
            "say": "cg_faroles_nerea",
            "text": "Así vendrá gente que todavía no conoce la orilla."
          }
        ]
      },
      {
        "if": "flag.cg_faroles_1_decision2_1",
        "then": [
          {
            "say": "cg_faroles_nerea",
            "text": "Así los Pokémon podrán quedarse sin sentirse observados."
          }
        ]
      }
    ],
    "cg_faroles_1_segunda": [
      {
        "if": "!(flag.cg_faroles_1_started && !flag.cg_faroles_1_completed) || flag.cg_faroles_1_task_b",
        "then": [
          {
            "end": true
          }
        ]
      },
      {
        "say": "misty",
        "text": "Recupera la boya de medida con la caña. Su marca nos dirá a qué altura poner la señal sin que vuelva a mojarse."
      },
      {
        "minigame": {
          "id": "cg_faroles_1_segunda_fish",
          "type": "fish",
          "title": "Boya de medida",
          "level": 2,
          "theme": "rio",
          "hint": "Recoge el flotador sin dar tirones.",
          "guaranteed": [
            "cg_faroles_1_material_b"
          ],
          "picks": 0,
          "consolation": false
        },
        "onWin": [
          {
            "set": {
              "flag.cg_faroles_1_task_b": true
            }
          },
          {
            "if": "flag.cg_faroles_1_task_a && flag.cg_faroles_1_task_b",
            "then": [
              {
                "set": {
                  "flag.cg_faroles_1_explored": true
                }
              },
              {
                "quest": "cg_faroles_1_quest",
                "stage": "reto"
              }
            ]
          }
        ],
        "onLose": [
          {
            "text": "No se perdió nada. Puedes repetir la prueba."
          }
        ],
        "onQuit": [
          {
            "text": "Puedes volver cuando quieras; nadie continuará sin ti."
          }
        ]
      }
    ],
    "cg_faroles_2_intro": [
      {
        "if": "!(flag.cg_faroles_1_completed) || flag.cg_faroles_2_started",
        "then": [
          {
            "end": true
          }
        ]
      },
      {
        "if": "flag.cg_faroles_1_decision2_0",
        "then": [
          {
            "say": "bill",
            "text": "Trajiste la idea de una señal lejana. Empezaremos probando un pulso que se vea sin dejar de escuchar el patio."
          }
        ]
      },
      {
        "if": "flag.cg_faroles_1_decision2_1",
        "then": [
          {
            "say": "bill",
            "text": "Trajiste la idea de proteger el descanso. Vamos a probar el farol a poca altura."
          }
        ]
      },
      {
        "quest": "cg_faroles_2_quest",
        "stage": "inicio"
      },
      {
        "say": "cg_faroles_nerea",
        "text": "Bill pone una bandeja debajo del farol. Sigue goteando. «Primero resolveré la bandeja; después, el invento». Nerea parece aliviada."
      },
      {
        "prompt": "¿Qué pieza probamos primero?",
        "choice": [
          {
            "text": "Reordenar el banco de trabajo",
            "then": [
              {
                "set": {
                  "flag.cg_faroles_2_decision1_0": true
                }
              },
              {
                "say": "cg_faroles_nerea",
                "text": "Si algo se cae, que esta vez no sea el farol."
              }
            ]
          },
          {
            "text": "Abrir la caja de conexiones",
            "then": [
              {
                "set": {
                  "flag.cg_faroles_2_decision1_1": true
                }
              },
              {
                "say": "cg_faroles_nerea",
                "text": "Está cerrada por mi propio candado. También guardé la combinación. Creo."
              }
            ]
          }
        ]
      },
      {
        "set": {
          "flag.cg_faroles_2_started": true
        }
      },
      {
        "quest": "cg_faroles_2_quest",
        "stage": "investigar"
      }
    ],
    "cg_faroles_2_explore": [
      {
        "if": "!(flag.cg_faroles_2_started && !flag.cg_faroles_2_completed) || flag.cg_faroles_2_task_a",
        "then": [
          {
            "end": true
          }
        ]
      },
      {
        "if": "flag.cg_faroles_2_decision1_0",
        "then": [
          {
            "puzzle": {
              "id": "cg_faroles_2_puzzle",
              "title": "Preparar el paso",
              "theme": "lab",
              "hint": "Coloca una caja sobre cada placa y llega a la salida. Puedes deshacer o reiniciar.",
              "grid": [
                "#######",
                "#P.RS.#",
                "#.....#",
                "#.....#",
                "##D####",
                "#....G#",
                "#######"
              ]
            },
            "onSolve": [
              {
                "set": {
                  "flag.cg_faroles_2_task_a": true
                }
              },
              {
                "if": "flag.cg_faroles_2_task_a && flag.cg_faroles_2_task_b",
                "then": [
                  {
                    "set": {
                      "flag.cg_faroles_2_explored": true
                    }
                  },
                  {
                    "quest": "cg_faroles_2_quest",
                    "stage": "reto"
                  }
                ]
              }
            ],
            "onQuit": [
              {
                "text": "El montaje se queda como estaba. Puedes volver a intentarlo."
              }
            ]
          }
        ]
      },
      {
        "if": "flag.cg_faroles_2_decision1_1",
        "then": [
          {
            "minigame": {
              "id": "cg_faroles_2_lock",
              "type": "lock",
              "title": "Caja de conexiones",
              "level": 2,
              "theme": "caja",
              "hint": "Repite la secuencia. Puedes verla otra vez.",
              "guaranteed": [
                "cg_faroles_2_material_a"
              ],
              "picks": 0,
              "consolation": false
            },
            "onWin": [
              {
                "set": {
                  "flag.cg_faroles_2_task_a": true
                }
              },
              {
                "if": "flag.cg_faroles_2_task_a && flag.cg_faroles_2_task_b",
                "then": [
                  {
                    "set": {
                      "flag.cg_faroles_2_explored": true
                    }
                  },
                  {
                    "quest": "cg_faroles_2_quest",
                    "stage": "reto"
                  }
                ]
              }
            ],
            "onLose": [
              {
                "text": "No se perdió nada. Puedes repetir la prueba."
              }
            ],
            "onQuit": [
              {
                "text": "Puedes volver cuando quieras; nadie continuará sin ti."
              }
            ]
          }
        ]
      }
    ],
    "cg_faroles_2_battle": [
      {
        "if": "!(flag.cg_faroles_2_started && !flag.cg_faroles_2_completed) || !flag.cg_faroles_2_explored || flag.cg_faroles_2_won",
        "then": [
          {
            "end": true
          }
        ]
      },
      {
        "say": "cg_faroles_nerea",
        "text": "Nerea quiere comprobar si la cubierta soporta una exhibición cerca del farol. Bill aparta primero el material delicado."
      },
      {
        "choice": [
          {
            "text": "Hacer el ensayo (curación antes y después)",
            "then": [
              {
                "heal": true
              },
              {
                "battle": "cg_faroles_2_trainer",
                "lose": "continue",
                "noLoss": true,
                "onWin": [
                  {
                    "heal": true
                  },
                  {
                    "set": {
                      "flag.cg_faroles_2_won": true
                    }
                  },
                  {
                    "quest": "cg_faroles_2_quest",
                    "stage": "regreso"
                  },
                  {
                    "set": {
                      "flag.cg_faroles_2_combat_won": true
                    }
                  }
                ],
                "onLose": [
                  {
                    "heal": true
                  },
                  {
                    "say": "cg_faroles_nerea",
                    "text": "Lo dejamos aquí. El ensayo sigue disponible; las tareas anteriores están guardadas."
                  }
                ]
              }
            ]
          },
          {
            "text": "Revisar las sujeciones sin combatir",
            "then": [
              {
                "text": "Misty comprueba el perímetro libre y Bill revisa el cierre. La alternativa no da premios de combate."
              },
              {
                "set": {
                  "flag.cg_faroles_2_ensayo_manual": true
                }
              },
              {
                "set": {
                  "flag.cg_faroles_2_won": true
                }
              },
              {
                "quest": "cg_faroles_2_quest",
                "stage": "regreso"
              }
            ]
          },
          {
            "text": "Volver después",
            "then": [
              {
                "text": "Nerea te guarda el sitio. Puedes ir al Centro, cambiar de equipo o seguir más tarde."
              }
            ]
          }
        ]
      }
    ],
    "cg_faroles_2_finish": [
      {
        "if": "!(flag.cg_faroles_2_started && !flag.cg_faroles_2_completed) || !flag.cg_faroles_2_won",
        "then": [
          {
            "end": true
          }
        ]
      },
      {
        "text": "Cuando Nerea baja la voz, el farol deja de parpadear. Bill escucha el tintineo de una pieza suelta; no hay ningún poder nuevo."
      },
      {
        "prompt": "La luz ya funciona. ¿Cómo debería cambiar?",
        "choice": [
          {
            "text": "Un pulso reconocible y espaciado",
            "then": [
              {
                "set": {
                  "flag.cg_faroles_2_decision2_0": true
                }
              },
              {
                "say": "cg_faroles_nerea",
                "text": "Servirá de referencia sin encandilar todo el tiempo."
              }
            ]
          },
          {
            "text": "Brillo estable y muy suave",
            "then": [
              {
                "set": {
                  "flag.cg_faroles_2_decision2_1": true
                }
              },
              {
                "say": "cg_faroles_nerea",
                "text": "Se verá menos lejos, pero no despertará al que ya descansa."
              }
            ]
          }
        ]
      },
      {
        "if": "flag.cg_faroles_2_decision1_0",
        "then": [
          {
            "say": "cg_faroles_nerea",
            "text": "El banco despejado permite sujetar el farol sin prisas."
          }
        ]
      },
      {
        "if": "flag.cg_faroles_2_decision1_1",
        "then": [
          {
            "say": "cg_faroles_nerea",
            "text": "Recuperas la pieza correcta sin forzar el candado. Nerea recupera su orgullo con ella."
          }
        ]
      },
      {
        "say": "cg_faroles_nerea",
        "text": "Sabrina ofreció un patio tranquilo para una prueba. Bill etiqueta el farol: «No sumergir por segunda vez»."
      },
      {
        "give": "cg_faroles_2_recuerdo"
      },
      {
        "money": 400
      },
      {
        "give": "hyperpotion",
        "n": 1
      },
      {
        "say": "bill",
        "text": "El próximo ensayo empieza en Ciudad Azafrán. Puedes dejarlo para cuando vuelvas."
      },
      {
        "quest": "cg_faroles_2_quest",
        "done": true
      },
      {
        "set": {
          "flag.cg_faroles_2_completed": true
        }
      }
    ],
    "cg_faroles_2_after": [
      {
        "if": "!flag.cg_faroles_2_completed",
        "then": [
          {
            "end": true
          }
        ]
      },
      {
        "if": "flag.cg_faroles_2_decision2_0",
        "then": [
          {
            "say": "cg_faroles_nerea",
            "text": "Servirá de referencia sin encandilar todo el tiempo."
          }
        ]
      },
      {
        "if": "flag.cg_faroles_2_decision2_1",
        "then": [
          {
            "say": "cg_faroles_nerea",
            "text": "Se verá menos lejos, pero no despertará al que ya descansa."
          }
        ]
      }
    ],
    "cg_faroles_2_segunda": [
      {
        "if": "!(flag.cg_faroles_2_started && !flag.cg_faroles_2_completed) || flag.cg_faroles_2_task_b",
        "then": [
          {
            "end": true
          }
        ]
      },
      {
        "say": "bill",
        "text": "Estas bayas son del lote del ensayo. Recógelas aquí; no hace falta sacar las tuyas de la mochila."
      },
      {
        "minigame": {
          "id": "cg_faroles_2_segunda_catch",
          "type": "catch",
          "title": "Bayas para la cubierta",
          "level": 2,
          "theme": "huerto",
          "hint": "Recoge las bayas para la cubierta.",
          "guaranteed": [
            "cg_faroles_2_material_b"
          ],
          "picks": 0,
          "consolation": false
        },
        "onWin": [
          {
            "set": {
              "flag.cg_faroles_2_task_b": true
            }
          },
          {
            "if": "flag.cg_faroles_2_task_a && flag.cg_faroles_2_task_b",
            "then": [
              {
                "set": {
                  "flag.cg_faroles_2_explored": true
                }
              },
              {
                "quest": "cg_faroles_2_quest",
                "stage": "reto"
              }
            ]
          }
        ],
        "onLose": [
          {
            "text": "No se perdió nada. Puedes repetir la prueba."
          }
        ],
        "onQuit": [
          {
            "text": "Puedes volver cuando quieras; nadie continuará sin ti."
          }
        ]
      }
    ],
    "cg_faroles_3_intro": [
      {
        "if": "!(flag.cg_faroles_2_completed) || flag.cg_faroles_3_started",
        "then": [
          {
            "end": true
          }
        ]
      },
      {
        "if": "flag.cg_faroles_2_decision2_0",
        "then": [
          {
            "say": "sabrina",
            "text": "Bill me habló del pulso espaciado. Vamos a dejar un intervalo suficiente para que el patio se acostumbre."
          }
        ]
      },
      {
        "if": "flag.cg_faroles_2_decision2_1",
        "then": [
          {
            "say": "sabrina",
            "text": "Bill preparó un brillo suave. Separaremos las luces del banco de descanso."
          }
        ]
      },
      {
        "quest": "cg_faroles_3_quest",
        "stage": "inicio"
      },
      {
        "say": "cg_faroles_nerea",
        "text": "Sabrina ha dejado sitio entre las macetas. «No leeré a nadie para saber si está cómodo. Dejaremos una salida». Nerea afloja el cartel de entrada."
      },
      {
        "prompt": "¿Cómo preparamos los filtros?",
        "choice": [
          {
            "text": "Recordar el orden del estuche",
            "then": [
              {
                "set": {
                  "flag.cg_faroles_3_decision1_0": true
                }
              },
              {
                "say": "cg_faroles_nerea",
                "text": "Tienen colores distintos. No hace falta adivinar lo que siente nadie."
              }
            ]
          },
          {
            "text": "Mover los soportes del patio",
            "then": [
              {
                "set": {
                  "flag.cg_faroles_3_decision1_1": true
                }
              },
              {
                "say": "cg_faroles_nerea",
                "text": "Dejaremos más sitio para entrar y salir."
              }
            ]
          }
        ]
      },
      {
        "set": {
          "flag.cg_faroles_3_started": true
        }
      },
      {
        "quest": "cg_faroles_3_quest",
        "stage": "investigar"
      }
    ],
    "cg_faroles_3_explore": [
      {
        "if": "!(flag.cg_faroles_3_started && !flag.cg_faroles_3_completed) || flag.cg_faroles_3_task_a",
        "then": [
          {
            "end": true
          }
        ]
      },
      {
        "if": "flag.cg_faroles_3_decision1_0",
        "then": [
          {
            "minigame": {
              "id": "cg_faroles_3_lock",
              "type": "lock",
              "title": "La prueba de Nerea",
              "level": 2,
              "theme": "caja",
              "hint": "Repite la secuencia. Puedes verla otra vez.",
              "guaranteed": [
                "cg_faroles_3_material_a"
              ],
              "picks": 0,
              "consolation": false
            },
            "onWin": [
              {
                "set": {
                  "flag.cg_faroles_3_task_a": true
                }
              },
              {
                "if": "flag.cg_faroles_3_task_a && flag.cg_faroles_3_task_b",
                "then": [
                  {
                    "set": {
                      "flag.cg_faroles_3_explored": true
                    }
                  },
                  {
                    "quest": "cg_faroles_3_quest",
                    "stage": "reto"
                  }
                ]
              }
            ],
            "onLose": [
              {
                "text": "No se perdió nada. Puedes repetir la prueba."
              }
            ],
            "onQuit": [
              {
                "text": "Puedes volver cuando quieras; nadie continuará sin ti."
              }
            ]
          }
        ]
      },
      {
        "if": "flag.cg_faroles_3_decision1_1",
        "then": [
          {
            "puzzle": {
              "id": "cg_faroles_3_puzzle",
              "title": "Abrir un paso seguro",
              "theme": "lab",
              "hint": "Coloca una caja sobre cada placa y llega a la salida. Puedes deshacer o reiniciar.",
              "grid": [
                "#######",
                "#P....#",
                "#.R.S.#",
                "#.....#",
                "####D##",
                "#....G#",
                "#######"
              ]
            },
            "onSolve": [
              {
                "set": {
                  "flag.cg_faroles_3_task_a": true
                }
              },
              {
                "if": "flag.cg_faroles_3_task_a && flag.cg_faroles_3_task_b",
                "then": [
                  {
                    "set": {
                      "flag.cg_faroles_3_explored": true
                    }
                  },
                  {
                    "quest": "cg_faroles_3_quest",
                    "stage": "reto"
                  }
                ]
              }
            ],
            "onQuit": [
              {
                "text": "El montaje se queda como estaba. Puedes volver a intentarlo."
              }
            ]
          }
        ]
      }
    ],
    "cg_faroles_3_battle": [
      {
        "if": "!(flag.cg_faroles_3_started && !flag.cg_faroles_3_completed) || !flag.cg_faroles_3_explored || flag.cg_faroles_3_won",
        "then": [
          {
            "end": true
          }
        ]
      },
      {
        "say": "cg_faroles_nerea",
        "text": "Nerea propone una exhibición breve desde el borde del patio. Quien prefiera silencio podrá quedarse al otro lado."
      },
      {
        "choice": [
          {
            "text": "Hacer el ensayo (curación antes y después)",
            "then": [
              {
                "heal": true
              },
              {
                "battle": "cg_faroles_3_trainer",
                "lose": "continue",
                "noLoss": true,
                "onWin": [
                  {
                    "heal": true
                  },
                  {
                    "set": {
                      "flag.cg_faroles_3_won": true
                    }
                  },
                  {
                    "quest": "cg_faroles_3_quest",
                    "stage": "regreso"
                  },
                  {
                    "set": {
                      "flag.cg_faroles_3_combat_won": true
                    }
                  }
                ],
                "onLose": [
                  {
                    "heal": true
                  },
                  {
                    "say": "cg_faroles_nerea",
                    "text": "Lo dejamos aquí. El ensayo sigue disponible; las tareas anteriores están guardadas."
                  }
                ]
              }
            ]
          },
          {
            "text": "Revisar las sujeciones sin combatir",
            "then": [
              {
                "text": "Misty comprueba el perímetro libre y Bill revisa el cierre. La alternativa no da premios de combate."
              },
              {
                "set": {
                  "flag.cg_faroles_3_ensayo_manual": true
                }
              },
              {
                "set": {
                  "flag.cg_faroles_3_won": true
                }
              },
              {
                "quest": "cg_faroles_3_quest",
                "stage": "regreso"
              }
            ]
          },
          {
            "text": "Volver después",
            "then": [
              {
                "text": "Nerea te guarda el sitio. Puedes ir al Centro, cambiar de equipo o seguir más tarde."
              }
            ]
          }
        ]
      }
    ],
    "cg_faroles_3_finish": [
      {
        "if": "!(flag.cg_faroles_3_started && !flag.cg_faroles_3_completed) || !flag.cg_faroles_3_won",
        "then": [
          {
            "end": true
          }
        ]
      },
      {
        "text": "Un Pokémon se acerca al círculo de luz y luego se retira. Sabrina impide que Nerea lo siga: «También ha elegido». Nerea deja el paso libre."
      },
      {
        "prompt": "¿Cómo invitamos a quien aún no se acerca?",
        "choice": [
          {
            "text": "Una invitación visible, sin insistir",
            "then": [
              {
                "set": {
                  "flag.cg_faroles_3_decision2_0": true
                }
              },
              {
                "say": "cg_faroles_nerea",
                "text": "Podrá encontrar el patio aunque nadie se lo explique."
              }
            ]
          },
          {
            "text": "Esperar junto a una entrada tranquila",
            "then": [
              {
                "set": {
                  "flag.cg_faroles_3_decision2_1": true
                }
              },
              {
                "say": "cg_faroles_nerea",
                "text": "Será más lento. Me quedaré para recibir a quien llegue."
              }
            ]
          }
        ]
      },
      {
        "if": "flag.cg_faroles_3_decision1_0",
        "then": [
          {
            "say": "cg_faroles_nerea",
            "text": "Los filtros que ordenaste dejan una luz uniforme."
          }
        ]
      },
      {
        "if": "flag.cg_faroles_3_decision1_1",
        "then": [
          {
            "say": "cg_faroles_nerea",
            "text": "La separación de los soportes permite retirarse sin cruzar entre los demás."
          }
        ]
      },
      {
        "say": "cg_faroles_nerea",
        "text": "Misty avisa que falta probar el recorrido junto al agua. Nerea guarda el cartel: la salida se quedará sin letreros."
      },
      {
        "give": "cg_faroles_3_recuerdo"
      },
      {
        "money": 400
      },
      {
        "give": "hyperpotion",
        "n": 1
      },
      {
        "say": "sabrina",
        "text": "El próximo ensayo empieza en Ciudad Celeste. Puedes dejarlo para cuando vuelvas."
      },
      {
        "quest": "cg_faroles_3_quest",
        "done": true
      },
      {
        "set": {
          "flag.cg_faroles_3_completed": true
        }
      }
    ],
    "cg_faroles_3_after": [
      {
        "if": "!flag.cg_faroles_3_completed",
        "then": [
          {
            "end": true
          }
        ]
      },
      {
        "if": "flag.cg_faroles_3_decision2_0",
        "then": [
          {
            "say": "cg_faroles_nerea",
            "text": "Podrá encontrar el patio aunque nadie se lo explique."
          }
        ]
      },
      {
        "if": "flag.cg_faroles_3_decision2_1",
        "then": [
          {
            "say": "cg_faroles_nerea",
            "text": "Será más lento. Me quedaré para recibir a quien llegue."
          }
        ]
      }
    ],
    "cg_faroles_3_segunda": [
      {
        "if": "!(flag.cg_faroles_3_started && !flag.cg_faroles_3_completed) || flag.cg_faroles_3_task_b",
        "then": [
          {
            "end": true
          }
        ]
      },
      {
        "say": "sabrina",
        "text": "El soporte quedó detrás de las cajas. Despeja el paso sin empujarlo contra la pared."
      },
      {
        "puzzle": {
          "id": "cg_faroles_3_segunda_puzzle",
          "title": "Recoger el soporte",
          "theme": "lab",
          "hint": "Coloca una caja sobre cada placa y llega a la salida. Puedes deshacer o reiniciar.",
          "grid": [
            "#######",
            "#P....#",
            "#.R...#",
            "#...S.#",
            "###D###",
            "#....G#",
            "#######"
          ]
        },
        "onSolve": [
          {
            "set": {
              "flag.cg_faroles_3_task_b": true
            }
          },
          {
            "if": "flag.cg_faroles_3_task_a && flag.cg_faroles_3_task_b",
            "then": [
              {
                "set": {
                  "flag.cg_faroles_3_explored": true
                }
              },
              {
                "quest": "cg_faroles_3_quest",
                "stage": "reto"
              }
            ]
          }
        ],
        "onQuit": [
          {
            "text": "El montaje se queda como estaba. Puedes volver a intentarlo."
          }
        ]
      }
    ],
    "cg_faroles_4_intro": [
      {
        "if": "!(flag.cg_faroles_3_completed) || flag.cg_faroles_4_started",
        "then": [
          {
            "end": true
          }
        ]
      },
      {
        "if": "flag.cg_faroles_3_decision2_0",
        "then": [
          {
            "say": "misty",
            "text": "La invitación quedó visible. Misty ha reservado un paso por el que pueda entrar quien no venga acompañado."
          }
        ]
      },
      {
        "if": "flag.cg_faroles_3_decision2_1",
        "then": [
          {
            "say": "misty",
            "text": "La entrada tranquila funcionó. Misty ha dejado un banco lejos del paso de los curiosos."
          }
        ]
      },
      {
        "quest": "cg_faroles_4_quest",
        "stage": "inicio"
      },
      {
        "say": "cg_faroles_nerea",
        "text": "Misty encuentra a Nerea mirando el agua. Se cayó el soporte que llevaba la marca de su primer taller. «Este no sé hacerlo otra vez», admite."
      },
      {
        "prompt": "¿Cómo buscamos el soporte?",
        "choice": [
          {
            "text": "Rastrearlo con el Buscaobjetos de Bill",
            "then": [
              {
                "set": {
                  "flag.cg_faroles_4_decision1_0": true
                }
              },
              {
                "say": "cg_faroles_nerea",
                "text": "Bill lo prestó para la prueba. Lo devolveremos al terminar."
              }
            ]
          },
          {
            "text": "Abrir paso entre los cajones",
            "then": [
              {
                "set": {
                  "flag.cg_faroles_4_decision1_1": true
                }
              },
              {
                "say": "cg_faroles_nerea",
                "text": "Nada de meterse al agua. Misty vigilará desde aquí."
              }
            ]
          }
        ]
      },
      {
        "set": {
          "flag.cg_faroles_4_started": true
        }
      },
      {
        "quest": "cg_faroles_4_quest",
        "stage": "investigar"
      }
    ],
    "cg_faroles_4_explore": [
      {
        "if": "!(flag.cg_faroles_4_started && !flag.cg_faroles_4_completed) || flag.cg_faroles_4_task_a",
        "then": [
          {
            "end": true
          }
        ]
      },
      {
        "if": "flag.cg_faroles_4_decision1_0",
        "then": [
          {
            "minigame": {
              "id": "cg_faroles_4_aura",
              "type": "aura",
              "title": "La prueba de Nerea",
              "level": 2,
              "theme": "buscaobjetos",
              "hint": "Busca el soporte con el detector prestado por Bill.",
              "guaranteed": [
                "cg_faroles_4_material_a"
              ],
              "picks": 0,
              "consolation": false
            },
            "onWin": [
              {
                "set": {
                  "flag.cg_faroles_4_task_a": true
                }
              },
              {
                "if": "flag.cg_faroles_4_task_a && flag.cg_faroles_4_task_b",
                "then": [
                  {
                    "set": {
                      "flag.cg_faroles_4_explored": true
                    }
                  },
                  {
                    "quest": "cg_faroles_4_quest",
                    "stage": "reto"
                  }
                ]
              }
            ],
            "onLose": [
              {
                "text": "No se perdió nada. Puedes repetir la prueba."
              }
            ],
            "onQuit": [
              {
                "text": "Puedes volver cuando quieras; nadie continuará sin ti."
              }
            ]
          }
        ]
      },
      {
        "if": "flag.cg_faroles_4_decision1_1",
        "then": [
          {
            "puzzle": {
              "id": "cg_faroles_4_puzzle",
              "title": "Abrir un paso seguro",
              "theme": "lab",
              "hint": "Coloca una caja sobre cada placa y llega a la salida. Puedes deshacer o reiniciar.",
              "grid": [
                "#######",
                "#P....#",
                "#..R..#",
                "#..S..#",
                "#D#####",
                "#....G#",
                "#######"
              ]
            },
            "onSolve": [
              {
                "set": {
                  "flag.cg_faroles_4_task_a": true
                }
              },
              {
                "if": "flag.cg_faroles_4_task_a && flag.cg_faroles_4_task_b",
                "then": [
                  {
                    "set": {
                      "flag.cg_faroles_4_explored": true
                    }
                  },
                  {
                    "quest": "cg_faroles_4_quest",
                    "stage": "reto"
                  }
                ]
              }
            ],
            "onQuit": [
              {
                "text": "El montaje se queda como estaba. Puedes volver a intentarlo."
              }
            ]
          }
        ]
      }
    ],
    "cg_faroles_4_battle": [
      {
        "if": "!(flag.cg_faroles_4_started && !flag.cg_faroles_4_completed) || !flag.cg_faroles_4_explored || flag.cg_faroles_4_won",
        "then": [
          {
            "end": true
          }
        ]
      },
      {
        "say": "cg_faroles_nerea",
        "text": "Con el soporte recuperado, Nerea pide una última práctica. Misty elige una zona seca y detiene el paso de los curiosos."
      },
      {
        "choice": [
          {
            "text": "Hacer el ensayo (curación antes y después)",
            "then": [
              {
                "heal": true
              },
              {
                "battle": "cg_faroles_4_trainer",
                "lose": "continue",
                "noLoss": true,
                "onWin": [
                  {
                    "heal": true
                  },
                  {
                    "set": {
                      "flag.cg_faroles_4_won": true
                    }
                  },
                  {
                    "quest": "cg_faroles_4_quest",
                    "stage": "regreso"
                  },
                  {
                    "set": {
                      "flag.cg_faroles_4_combat_won": true
                    }
                  }
                ],
                "onLose": [
                  {
                    "heal": true
                  },
                  {
                    "say": "cg_faroles_nerea",
                    "text": "Lo dejamos aquí. El ensayo sigue disponible; las tareas anteriores están guardadas."
                  }
                ]
              }
            ]
          },
          {
            "text": "Revisar las sujeciones sin combatir",
            "then": [
              {
                "text": "Misty comprueba el perímetro libre y Bill revisa el cierre. La alternativa no da premios de combate."
              },
              {
                "set": {
                  "flag.cg_faroles_4_ensayo_manual": true
                }
              },
              {
                "set": {
                  "flag.cg_faroles_4_won": true
                }
              },
              {
                "quest": "cg_faroles_4_quest",
                "stage": "regreso"
              }
            ]
          },
          {
            "text": "Volver después",
            "then": [
              {
                "text": "Nerea te guarda el sitio. Puedes ir al Centro, cambiar de equipo o seguir más tarde."
              }
            ]
          }
        ]
      }
    ],
    "cg_faroles_4_finish": [
      {
        "if": "!(flag.cg_faroles_4_started && !flag.cg_faroles_4_completed) || !flag.cg_faroles_4_won",
        "then": [
          {
            "end": true
          }
        ]
      },
      {
        "text": "El soporte está doblado, pero sirve. Nerea deja la abolladura hacia fuera para reconocerlo entre todos los nuevos."
      },
      {
        "prompt": "El soporte aún sostiene un farol. ¿Dónde lo ponemos?",
        "choice": [
          {
            "text": "En el punto donde empieza el recorrido",
            "then": [
              {
                "set": {
                  "flag.cg_faroles_4_decision2_0": true
                }
              },
              {
                "say": "cg_faroles_nerea",
                "text": "Podré verlo cuando llegue cada visitante."
              }
            ]
          },
          {
            "text": "En el pequeño descanso de la orilla",
            "then": [
              {
                "set": {
                  "flag.cg_faroles_4_decision2_1": true
                }
              },
              {
                "say": "cg_faroles_nerea",
                "text": "Quien se siente tendrá una luz que ya conoce el camino."
              }
            ]
          }
        ]
      },
      {
        "if": "flag.cg_faroles_4_decision1_0",
        "then": [
          {
            "say": "cg_faroles_nerea",
            "text": "El Buscaobjetos encuentra el metal sin remover toda la orilla."
          }
        ]
      },
      {
        "if": "flag.cg_faroles_4_decision1_1",
        "then": [
          {
            "say": "cg_faroles_nerea",
            "text": "El paso entre cajones queda abierto para quien vuelva mañana."
          }
        ]
      },
      {
        "say": "cg_faroles_nerea",
        "text": "Queda una prueba con todo montado. Nerea pide que la hagas tú: esta vez quiere mirar desde el público."
      },
      {
        "give": "cg_faroles_4_recuerdo"
      },
      {
        "money": 500
      },
      {
        "give": "hyperpotion",
        "n": 1
      },
      {
        "say": "misty",
        "text": "El próximo ensayo empieza en Ciudad Celeste. Puedes dejarlo para cuando vuelvas."
      },
      {
        "quest": "cg_faroles_4_quest",
        "done": true
      },
      {
        "set": {
          "flag.cg_faroles_4_completed": true
        }
      }
    ],
    "cg_faroles_4_after": [
      {
        "if": "!flag.cg_faroles_4_completed",
        "then": [
          {
            "end": true
          }
        ]
      },
      {
        "if": "flag.cg_faroles_4_decision2_0",
        "then": [
          {
            "say": "cg_faroles_nerea",
            "text": "Podré verlo cuando llegue cada visitante."
          }
        ]
      },
      {
        "if": "flag.cg_faroles_4_decision2_1",
        "then": [
          {
            "say": "cg_faroles_nerea",
            "text": "Quien se siente tendrá una luz que ya conoce el camino."
          }
        ]
      }
    ],
    "cg_faroles_4_segunda": [
      {
        "if": "!(flag.cg_faroles_4_started && !flag.cg_faroles_4_completed) || flag.cg_faroles_4_task_b",
        "then": [
          {
            "end": true
          }
        ]
      },
      {
        "say": "misty",
        "text": "La cuerda se enganchó junto al embarcadero. Vamos a traerla sin arrastrar el soporte."
      },
      {
        "minigame": {
          "id": "cg_faroles_4_segunda_fish",
          "type": "fish",
          "title": "La cuerda junto al agua",
          "level": 2,
          "theme": "rio",
          "hint": "Recoge el flotador sin dar tirones.",
          "guaranteed": [
            "cg_faroles_4_material_b"
          ],
          "picks": 0,
          "consolation": false
        },
        "onWin": [
          {
            "set": {
              "flag.cg_faroles_4_task_b": true
            }
          },
          {
            "if": "flag.cg_faroles_4_task_a && flag.cg_faroles_4_task_b",
            "then": [
              {
                "set": {
                  "flag.cg_faroles_4_explored": true
                }
              },
              {
                "quest": "cg_faroles_4_quest",
                "stage": "reto"
              }
            ]
          }
        ],
        "onLose": [
          {
            "text": "No se perdió nada. Puedes repetir la prueba."
          }
        ],
        "onQuit": [
          {
            "text": "Puedes volver cuando quieras; nadie continuará sin ti."
          }
        ]
      }
    ],
    "cg_faroles_5_intro": [
      {
        "if": "!(flag.cg_faroles_4_completed) || flag.cg_faroles_5_started",
        "then": [
          {
            "end": true
          }
        ]
      },
      {
        "if": "flag.cg_faroles_4_decision2_0",
        "then": [
          {
            "say": "bill",
            "text": "El soporte viejo marcará el inicio. Lo pondremos donde puedan verlo sin formar una fila alrededor."
          }
        ]
      },
      {
        "if": "flag.cg_faroles_4_decision2_1",
        "then": [
          {
            "say": "bill",
            "text": "El soporte viejo iluminará el descanso. El paso principal tendrá piezas nuevas."
          }
        ]
      },
      {
        "quest": "cg_faroles_5_quest",
        "stage": "inicio"
      },
      {
        "say": "cg_faroles_nerea",
        "text": "Misty sujeta la primera cuerda. Bill lleva una bandeja que ya no hace falta. Sabrina ocupa el banco con mejor vista de la salida. Nerea te guarda un sitio."
      },
      {
        "prompt": "¿Cómo hacemos la última revisión?",
        "choice": [
          {
            "text": "Probar primero el paso entre soportes",
            "then": [
              {
                "set": {
                  "flag.cg_faroles_5_decision1_0": true
                }
              },
              {
                "say": "cg_faroles_nerea",
                "text": "Misty comprobará la cuerda mientras avanzas."
              }
            ]
          },
          {
            "text": "Comprobar el estuche de recambios",
            "then": [
              {
                "set": {
                  "flag.cg_faroles_5_decision1_1": true
                }
              },
              {
                "say": "cg_faroles_nerea",
                "text": "Bill se encargará de que cada pieza vuelva a su caja."
              }
            ]
          }
        ]
      },
      {
        "set": {
          "flag.cg_faroles_5_started": true
        }
      },
      {
        "quest": "cg_faroles_5_quest",
        "stage": "investigar"
      }
    ],
    "cg_faroles_5_explore": [
      {
        "if": "!(flag.cg_faroles_5_started && !flag.cg_faroles_5_completed) || flag.cg_faroles_5_task_a",
        "then": [
          {
            "end": true
          }
        ]
      },
      {
        "if": "flag.cg_faroles_5_decision1_0",
        "then": [
          {
            "puzzle": {
              "id": "cg_faroles_5_puzzle",
              "title": "Preparar el paso",
              "theme": "lab",
              "hint": "Coloca una caja sobre cada placa y llega a la salida. Puedes deshacer o reiniciar.",
              "grid": [
                "#######",
                "#P....#",
                "#.R.R.#",
                "#.S.S.#",
                "###D###",
                "#....G#",
                "#######"
              ]
            },
            "onSolve": [
              {
                "set": {
                  "flag.cg_faroles_5_task_a": true
                }
              },
              {
                "if": "flag.cg_faroles_5_task_a && flag.cg_faroles_5_task_b",
                "then": [
                  {
                    "set": {
                      "flag.cg_faroles_5_explored": true
                    }
                  },
                  {
                    "quest": "cg_faroles_5_quest",
                    "stage": "reto"
                  }
                ]
              }
            ],
            "onQuit": [
              {
                "text": "El montaje se queda como estaba. Puedes volver a intentarlo."
              }
            ]
          }
        ]
      },
      {
        "if": "flag.cg_faroles_5_decision1_1",
        "then": [
          {
            "minigame": {
              "id": "cg_faroles_5_lock",
              "type": "lock",
              "title": "Estuche de recambios",
              "level": 2,
              "theme": "caja",
              "hint": "Repite la secuencia. Puedes verla otra vez.",
              "guaranteed": [
                "cg_faroles_5_material_a"
              ],
              "picks": 0,
              "consolation": false
            },
            "onWin": [
              {
                "set": {
                  "flag.cg_faroles_5_task_a": true
                }
              },
              {
                "if": "flag.cg_faroles_5_task_a && flag.cg_faroles_5_task_b",
                "then": [
                  {
                    "set": {
                      "flag.cg_faroles_5_explored": true
                    }
                  },
                  {
                    "quest": "cg_faroles_5_quest",
                    "stage": "reto"
                  }
                ]
              }
            ],
            "onLose": [
              {
                "text": "No se perdió nada. Puedes repetir la prueba."
              }
            ],
            "onQuit": [
              {
                "text": "Puedes volver cuando quieras; nadie continuará sin ti."
              }
            ]
          }
        ]
      }
    ],
    "cg_faroles_5_battle": [
      {
        "if": "!(flag.cg_faroles_5_started && !flag.cg_faroles_5_completed) || !flag.cg_faroles_5_explored || flag.cg_faroles_5_won",
        "then": [
          {
            "end": true
          }
        ]
      },
      {
        "say": "cg_faroles_nerea",
        "text": "Nerea hará una prueba de resistencia con su equipo. Habrá curación antes, se detendrá si pierdes y podrás volver sin repetir el montaje."
      },
      {
        "choice": [
          {
            "text": "Hacer el ensayo (curación antes y después)",
            "then": [
              {
                "heal": true
              },
              {
                "battle": "cg_faroles_5_trainer",
                "lose": "continue",
                "noLoss": true,
                "onWin": [
                  {
                    "heal": true
                  },
                  {
                    "set": {
                      "flag.cg_faroles_5_won": true
                    }
                  },
                  {
                    "quest": "cg_faroles_5_quest",
                    "stage": "regreso"
                  },
                  {
                    "set": {
                      "flag.cg_faroles_5_combat_won": true
                    }
                  }
                ],
                "onLose": [
                  {
                    "heal": true
                  },
                  {
                    "say": "cg_faroles_nerea",
                    "text": "Lo dejamos aquí. El ensayo sigue disponible; las tareas anteriores están guardadas."
                  }
                ]
              }
            ]
          },
          {
            "text": "Volver después",
            "then": [
              {
                "text": "Nerea te guarda el sitio. Puedes ir al Centro, cambiar de equipo o seguir más tarde."
              }
            ]
          }
        ]
      }
    ],
    "cg_faroles_5_finish": [
      {
        "if": "!(flag.cg_faroles_5_started && !flag.cg_faroles_5_completed) || !flag.cg_faroles_5_won",
        "then": [
          {
            "end": true
          }
        ]
      },
      {
        "text": "La prueba termina sin un solo farol en el agua. Bill mira su bandeja y parece, por un momento, un poco decepcionado."
      },
      {
        "prompt": "¿Qué espacio dejamos preparado para volver?",
        "choice": [
          {
            "text": "Un embarcadero para encuentros y pesca",
            "then": [
              {
                "set": {
                  "flag.cg_faroles_5_decision2_0": true
                }
              },
              {
                "say": "cg_faroles_nerea",
                "text": "Misty abrirá una zona de pesca con materiales comunes."
              }
            ]
          },
          {
            "text": "Un mirador tranquilo para buscar junto al agua",
            "then": [
              {
                "set": {
                  "flag.cg_faroles_5_decision2_1": true
                }
              },
              {
                "say": "cg_faroles_nerea",
                "text": "Sabrina reservará un banco y Bill prestará el Buscaobjetos."
              }
            ]
          }
        ]
      },
      {
        "if": "flag.cg_faroles_5_decision1_0",
        "then": [
          {
            "say": "cg_faroles_nerea",
            "text": "La distribución que probaste deja caminar sin rozar las cuerdas."
          }
        ]
      },
      {
        "if": "flag.cg_faroles_5_decision1_1",
        "then": [
          {
            "say": "cg_faroles_nerea",
            "text": "Los recambios están al alcance. Nadie tiene que desmontar un farol para buscar otro."
          }
        ]
      },
      {
        "say": "cg_faroles_nerea",
        "text": "Nerea deja encendido un farol de prueba. Tiene un soporte abollado y un nudo demasiado grande. Por fin no cambia ninguno de los dos."
      },
      {
        "give": "cg_faroles_5_recuerdo"
      },
      {
        "money": 700
      },
      {
        "give": "hyperpotion",
        "n": 2
      },
      {
        "say": "bill",
        "text": "El espacio queda abierto para que vuelvas cuando quieras."
      },
      {
        "quest": "cg_faroles_5_quest",
        "done": true
      },
      {
        "set": {
          "flag.cg_faroles_5_completed": true
        }
      }
    ],
    "cg_faroles_5_after": [
      {
        "if": "!flag.cg_faroles_5_completed",
        "then": [
          {
            "end": true
          }
        ]
      },
      {
        "if": "flag.cg_faroles_5_decision2_0",
        "then": [
          {
            "say": "cg_faroles_nerea",
            "text": "Misty abrirá una zona de pesca con materiales comunes."
          }
        ]
      },
      {
        "if": "flag.cg_faroles_5_decision2_1",
        "then": [
          {
            "say": "cg_faroles_nerea",
            "text": "Sabrina reservará un banco y Bill prestará el Buscaobjetos."
          }
        ]
      }
    ],
    "cg_faroles_5_segunda": [
      {
        "if": "!(flag.cg_faroles_5_started && !flag.cg_faroles_5_completed) || flag.cg_faroles_5_task_b",
        "then": [
          {
            "end": true
          }
        ]
      },
      {
        "say": "bill",
        "text": "Recoge las bayas de este lote. La cubierta se terminará aquí y Nerea la llevará a Celeste."
      },
      {
        "minigame": {
          "id": "cg_faroles_5_segunda_catch",
          "type": "catch",
          "title": "Bayas para la cubierta",
          "level": 2,
          "theme": "huerto",
          "hint": "Recoge las bayas para la cubierta.",
          "guaranteed": [
            "cg_faroles_5_material_b"
          ],
          "picks": 0,
          "consolation": false
        },
        "onWin": [
          {
            "set": {
              "flag.cg_faroles_5_task_b": true
            }
          },
          {
            "if": "flag.cg_faroles_5_task_a && flag.cg_faroles_5_task_b",
            "then": [
              {
                "set": {
                  "flag.cg_faroles_5_explored": true
                }
              },
              {
                "quest": "cg_faroles_5_quest",
                "stage": "reto"
              }
            ]
          }
        ],
        "onLose": [
          {
            "text": "No se perdió nada. Puedes repetir la prueba."
          }
        ],
        "onQuit": [
          {
            "text": "Puedes volver cuando quieras; nadie continuará sin ti."
          }
        ]
      }
    ]
  },
  "trainers": {
    "cg_faroles_1_trainer": {
      "name": "Nerea",
      "npc": "cg_faroles_nerea",
      "cls": "Artesana",
      "ai": 2,
      "reward": 0,
      "team": [
        {
          "sp": "pelipper",
          "lv": 53
        },
        {
          "sp": "lanturn",
          "lv": 54
        }
      ],
      "intro": "Ensayo de seguridad: despejamos el paso antes de empezar.",
      "win": "Buen ensayo. Las cuerdas siguen donde las dejamos.",
      "lose": "Paramos aquí. Curo a tu equipo; el montaje puede esperar."
    },
    "cg_faroles_2_trainer": {
      "name": "Nerea",
      "npc": "cg_faroles_nerea",
      "cls": "Artesana",
      "ai": 2,
      "reward": 0,
      "team": [
        {
          "sp": "noctowl",
          "lv": 54
        },
        {
          "sp": "ampharos",
          "lv": 54
        }
      ],
      "intro": "Ensayo de seguridad: despejamos el paso antes de empezar.",
      "win": "Buen ensayo. Las cuerdas siguen donde las dejamos.",
      "lose": "Paramos aquí. Curo a tu equipo; el montaje puede esperar."
    },
    "cg_faroles_3_trainer": {
      "name": "Nerea",
      "npc": "cg_faroles_nerea",
      "cls": "Artesana",
      "ai": 2,
      "reward": 0,
      "team": [
        {
          "sp": "mrmime",
          "lv": 54
        },
        {
          "sp": "noctowl",
          "lv": 55
        }
      ],
      "intro": "Ensayo de seguridad: despejamos el paso antes de empezar.",
      "win": "Buen ensayo. Las cuerdas siguen donde las dejamos.",
      "lose": "Paramos aquí. Curo a tu equipo; el montaje puede esperar."
    },
    "cg_faroles_4_trainer": {
      "name": "Nerea",
      "npc": "cg_faroles_nerea",
      "cls": "Artesana",
      "ai": 2,
      "reward": 0,
      "team": [
        {
          "sp": "lanturn",
          "lv": 55
        },
        {
          "sp": "pelipper",
          "lv": 55
        }
      ],
      "intro": "Ensayo de seguridad: despejamos el paso antes de empezar.",
      "win": "Buen ensayo. Las cuerdas siguen donde las dejamos.",
      "lose": "Paramos aquí. Curo a tu equipo; el montaje puede esperar."
    },
    "cg_faroles_5_trainer": {
      "name": "Nerea",
      "npc": "cg_faroles_nerea",
      "cls": "Artesana",
      "ai": 3,
      "reward": 0,
      "team": [
        {
          "sp": "pelipper",
          "lv": 55
        },
        {
          "sp": "ampharos",
          "lv": 56
        },
        {
          "sp": "noctowl",
          "lv": 57
        }
      ],
      "intro": "Ensayo de seguridad: despejamos el paso antes de empezar.",
      "win": "Buen ensayo. Las cuerdas siguen donde las dejamos.",
      "lose": "Paramos aquí. Curo a tu equipo; el montaje puede esperar."
    }
  },
  "gather": {
    "cg_faroles_embarcadero": {
      "name": "Embarcadero de los ensayos",
      "icon": "🧺",
      "hours": 20,
      "picks": [
        1,
        2
      ],
      "game": {
        "type": "fish",
        "theme": "rio",
        "level": 2
      },
      "text": "Nerea ha dejado este rincón preparado para tu próxima visita.",
      "wait": "Dejemos que la orilla descanse hasta la próxima recolección.",
      "table": [
        {
          "id": "pearl",
          "w": 2,
          "n": [
            1,
            1
          ]
        },
        {
          "id": "oranberry",
          "w": 8,
          "n": [
            1,
            2
          ]
        }
      ]
    },
    "cg_faroles_mirador": {
      "name": "Mirador de los ensayos",
      "icon": "🧺",
      "hours": 20,
      "picks": [
        1,
        2
      ],
      "game": {
        "type": "aura",
        "theme": "buscaobjetos",
        "level": 2
      },
      "text": "Nerea ha dejado este rincón preparado para tu próxima visita.",
      "wait": "Dejemos que la orilla descanse hasta la próxima recolección.",
      "table": [
        {
          "id": "pearl",
          "w": 2,
          "n": [
            1,
            1
          ]
        },
        {
          "id": "oranberry",
          "w": 8,
          "n": [
            1,
            2
          ]
        }
      ]
    }
  },
  "patches": {
    "celeste": {
      "spots": [
        {
          "label": "Nerea · La caja que navegó sola",
          "icon": "💬",
          "cond": "visited(\"celeste\") && visited(\"azafran\") && visited(\"casa_bill\") && badges >= 8 && !flag.cg_faroles_1_started",
          "new": "!flag.cg_faroles_1_started",
          "talk": [
            {
              "script": "cg_faroles_1_intro"
            }
          ]
        },
        {
          "label": "Prueba del montaje",
          "sub": "La caja que navegó sola",
          "icon": "🔧",
          "cond": "flag.cg_faroles_1_started && !flag.cg_faroles_1_completed && !flag.cg_faroles_1_task_a",
          "new": "!flag.cg_faroles_1_task_a",
          "talk": [
            {
              "script": "cg_faroles_1_explore"
            }
          ]
        },
        {
          "label": "Ensayo con Nerea",
          "icon": "⚔️",
          "cond": "flag.cg_faroles_1_started && !flag.cg_faroles_1_completed && flag.cg_faroles_1_explored && !flag.cg_faroles_1_won",
          "new": "!flag.cg_faroles_1_won",
          "talk": [
            {
              "script": "cg_faroles_1_battle"
            }
          ]
        },
        {
          "label": "Cerrar el ensayo con Nerea",
          "icon": "💬",
          "cond": "flag.cg_faroles_1_started && !flag.cg_faroles_1_completed && flag.cg_faroles_1_won",
          "new": "!flag.cg_faroles_1_completed",
          "talk": [
            {
              "script": "cg_faroles_1_finish"
            }
          ]
        },
        {
          "label": "Saludar a Nerea · ensayo 1",
          "icon": "💬",
          "cond": "flag.cg_faroles_1_completed && !flag.cg_faroles_2_started",
          "talk": [
            {
              "script": "cg_faroles_1_after"
            }
          ]
        },
        {
          "label": "Preparación complementaria",
          "sub": "Una luz que escucha",
          "icon": "🔎",
          "cond": "flag.cg_faroles_2_started && !flag.cg_faroles_2_completed && !flag.cg_faroles_2_task_b",
          "new": "!flag.cg_faroles_2_task_b",
          "talk": [
            {
              "script": "cg_faroles_2_segunda"
            }
          ]
        },
        {
          "label": "Nerea · Lo que el agua devuelve",
          "icon": "💬",
          "cond": "flag.cg_faroles_3_completed && !flag.cg_faroles_4_started",
          "new": "!flag.cg_faroles_4_started",
          "talk": [
            {
              "script": "cg_faroles_4_intro"
            }
          ]
        },
        {
          "label": "Prueba del montaje",
          "sub": "Lo que el agua devuelve",
          "icon": "🔧",
          "cond": "flag.cg_faroles_4_started && !flag.cg_faroles_4_completed && !flag.cg_faroles_4_task_a",
          "new": "!flag.cg_faroles_4_task_a",
          "talk": [
            {
              "script": "cg_faroles_4_explore"
            }
          ]
        },
        {
          "label": "Ensayo con Nerea",
          "icon": "⚔️",
          "cond": "flag.cg_faroles_4_started && !flag.cg_faroles_4_completed && flag.cg_faroles_4_explored && !flag.cg_faroles_4_won",
          "new": "!flag.cg_faroles_4_won",
          "talk": [
            {
              "script": "cg_faroles_4_battle"
            }
          ]
        },
        {
          "label": "Cerrar el ensayo con Nerea",
          "icon": "💬",
          "cond": "flag.cg_faroles_4_started && !flag.cg_faroles_4_completed && flag.cg_faroles_4_won",
          "new": "!flag.cg_faroles_4_completed",
          "talk": [
            {
              "script": "cg_faroles_4_finish"
            }
          ]
        },
        {
          "label": "Saludar a Nerea · ensayo 4",
          "icon": "💬",
          "cond": "flag.cg_faroles_4_completed && !flag.cg_faroles_5_started",
          "talk": [
            {
              "script": "cg_faroles_4_after"
            }
          ]
        },
        {
          "label": "Nerea · Un sitio bajo los faroles",
          "icon": "💬",
          "cond": "flag.cg_faroles_4_completed && !flag.cg_faroles_5_started",
          "new": "!flag.cg_faroles_5_started",
          "talk": [
            {
              "script": "cg_faroles_5_intro"
            }
          ]
        },
        {
          "label": "Prueba del montaje",
          "sub": "Un sitio bajo los faroles",
          "icon": "🔧",
          "cond": "flag.cg_faroles_5_started && !flag.cg_faroles_5_completed && !flag.cg_faroles_5_task_a",
          "new": "!flag.cg_faroles_5_task_a",
          "talk": [
            {
              "script": "cg_faroles_5_explore"
            }
          ]
        },
        {
          "label": "Ensayo con Nerea",
          "icon": "⚔️",
          "cond": "flag.cg_faroles_5_started && !flag.cg_faroles_5_completed && flag.cg_faroles_5_explored && !flag.cg_faroles_5_won",
          "new": "!flag.cg_faroles_5_won",
          "talk": [
            {
              "script": "cg_faroles_5_battle"
            }
          ]
        },
        {
          "label": "Cerrar el ensayo con Nerea",
          "icon": "💬",
          "cond": "flag.cg_faroles_5_started && !flag.cg_faroles_5_completed && flag.cg_faroles_5_won",
          "new": "!flag.cg_faroles_5_completed",
          "talk": [
            {
              "script": "cg_faroles_5_finish"
            }
          ]
        },
        {
          "label": "Saludar a Nerea · ensayo 5",
          "icon": "💬",
          "cond": "flag.cg_faroles_5_completed",
          "talk": [
            {
              "script": "cg_faroles_5_after"
            }
          ]
        },
        {
          "label": "Embarcadero de los ensayos",
          "icon": "🧺",
          "cond": "flag.cg_faroles_5_completed && flag.cg_faroles_5_decision2_0",
          "new": "!flag.rec_cg_faroles_embarcadero",
          "action": {
            "gather": "cg_faroles_embarcadero"
          }
        },
        {
          "label": "Mirador de los ensayos",
          "icon": "🧺",
          "cond": "flag.cg_faroles_5_completed && flag.cg_faroles_5_decision2_1",
          "new": "!flag.rec_cg_faroles_mirador",
          "action": {
            "gather": "cg_faroles_mirador"
          }
        }
      ]
    },
    "casa_bill": {
      "spots": [
        {
          "label": "Preparación complementaria",
          "sub": "La caja que navegó sola",
          "icon": "🔎",
          "cond": "flag.cg_faroles_1_started && !flag.cg_faroles_1_completed && !flag.cg_faroles_1_task_b",
          "new": "!flag.cg_faroles_1_task_b",
          "talk": [
            {
              "script": "cg_faroles_1_segunda"
            }
          ]
        },
        {
          "label": "Nerea · Una luz que escucha",
          "icon": "💬",
          "cond": "flag.cg_faroles_1_completed && !flag.cg_faroles_2_started",
          "new": "!flag.cg_faroles_2_started",
          "talk": [
            {
              "script": "cg_faroles_2_intro"
            }
          ]
        },
        {
          "label": "Prueba del montaje",
          "sub": "Una luz que escucha",
          "icon": "🔧",
          "cond": "flag.cg_faroles_2_started && !flag.cg_faroles_2_completed && !flag.cg_faroles_2_task_a",
          "new": "!flag.cg_faroles_2_task_a",
          "talk": [
            {
              "script": "cg_faroles_2_explore"
            }
          ]
        },
        {
          "label": "Ensayo con Nerea",
          "icon": "⚔️",
          "cond": "flag.cg_faroles_2_started && !flag.cg_faroles_2_completed && flag.cg_faroles_2_explored && !flag.cg_faroles_2_won",
          "new": "!flag.cg_faroles_2_won",
          "talk": [
            {
              "script": "cg_faroles_2_battle"
            }
          ]
        },
        {
          "label": "Cerrar el ensayo con Nerea",
          "icon": "💬",
          "cond": "flag.cg_faroles_2_started && !flag.cg_faroles_2_completed && flag.cg_faroles_2_won",
          "new": "!flag.cg_faroles_2_completed",
          "talk": [
            {
              "script": "cg_faroles_2_finish"
            }
          ]
        },
        {
          "label": "Saludar a Nerea · ensayo 2",
          "icon": "💬",
          "cond": "flag.cg_faroles_2_completed && !flag.cg_faroles_3_started",
          "talk": [
            {
              "script": "cg_faroles_2_after"
            }
          ]
        },
        {
          "label": "Preparación complementaria",
          "sub": "El patio sin aplausos",
          "icon": "🔎",
          "cond": "flag.cg_faroles_3_started && !flag.cg_faroles_3_completed && !flag.cg_faroles_3_task_b",
          "new": "!flag.cg_faroles_3_task_b",
          "talk": [
            {
              "script": "cg_faroles_3_segunda"
            }
          ]
        },
        {
          "label": "Preparación complementaria",
          "sub": "Lo que el agua devuelve",
          "icon": "🔎",
          "cond": "flag.cg_faroles_4_started && !flag.cg_faroles_4_completed && !flag.cg_faroles_4_task_b",
          "new": "!flag.cg_faroles_4_task_b",
          "talk": [
            {
              "script": "cg_faroles_4_segunda"
            }
          ]
        }
      ]
    },
    "azafran": {
      "spots": [
        {
          "label": "Nerea · El patio sin aplausos",
          "icon": "💬",
          "cond": "flag.cg_faroles_2_completed && !flag.cg_faroles_3_started",
          "new": "!flag.cg_faroles_3_started",
          "talk": [
            {
              "script": "cg_faroles_3_intro"
            }
          ]
        },
        {
          "label": "Prueba del montaje",
          "sub": "El patio sin aplausos",
          "icon": "🔧",
          "cond": "flag.cg_faroles_3_started && !flag.cg_faroles_3_completed && !flag.cg_faroles_3_task_a",
          "new": "!flag.cg_faroles_3_task_a",
          "talk": [
            {
              "script": "cg_faroles_3_explore"
            }
          ]
        },
        {
          "label": "Ensayo con Nerea",
          "icon": "⚔️",
          "cond": "flag.cg_faroles_3_started && !flag.cg_faroles_3_completed && flag.cg_faroles_3_explored && !flag.cg_faroles_3_won",
          "new": "!flag.cg_faroles_3_won",
          "talk": [
            {
              "script": "cg_faroles_3_battle"
            }
          ]
        },
        {
          "label": "Cerrar el ensayo con Nerea",
          "icon": "💬",
          "cond": "flag.cg_faroles_3_started && !flag.cg_faroles_3_completed && flag.cg_faroles_3_won",
          "new": "!flag.cg_faroles_3_completed",
          "talk": [
            {
              "script": "cg_faroles_3_finish"
            }
          ]
        },
        {
          "label": "Saludar a Nerea · ensayo 3",
          "icon": "💬",
          "cond": "flag.cg_faroles_3_completed && !flag.cg_faroles_4_started",
          "talk": [
            {
              "script": "cg_faroles_3_after"
            }
          ]
        },
        {
          "label": "Preparación complementaria",
          "sub": "Un sitio bajo los faroles",
          "icon": "🔎",
          "cond": "flag.cg_faroles_5_started && !flag.cg_faroles_5_completed && !flag.cg_faroles_5_task_b",
          "new": "!flag.cg_faroles_5_task_b",
          "talk": [
            {
              "script": "cg_faroles_5_segunda"
            }
          ]
        }
      ]
    }
  }
};
