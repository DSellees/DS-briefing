

const BRIEFING_CONTENT = {
  app: {
    title: "Briefing Estratégico",
    intro: "Este formulario nos ayuda a entender tu negocio, tus clientes y tus objetivos para construir una web más clara, mejor posicionada y orientada a generar oportunidades reales.",
    loginTitle: "Briefing estratégico",
    loginDescription: "Introduce tu código de acceso. Puedes completar el formulario poco a poco; todo se guarda automáticamente.",
    codePlaceholder: "Introduce tu código aquí"
  },

  sections: {
    brand: {
      tab: "Marca",
      number: "01",
      title: "Identidad y posicionamiento",
      description: "Esta sección nos ayuda a entender qué hace la empresa, qué necesidad resuelve y cómo debería presentarse ante sus clientes. Responde de forma concreta, con ejemplos reales y evitando frases demasiado genéricas.",
      exampleBadLabel: "Respuesta poco útil:",
      exampleBad: "calidad, confianza y profesionalidad",
      exampleGoodLabel: "Respuesta más útil:",
      exampleGood: "Ayudamos a un tipo concreto de cliente a resolver un problema concreto mediante una forma de trabajo clara, especializada y diferenciada.",
      fields: {
        empresa: {
          label: "Nombre de la empresa",
          placeholder: "Nombre comercial o marca principal"
        },
        sector: {
          label: "Sector o especialidad",
          placeholder: "Ej. salud, restauración, inmobiliaria, formación, consultoría, servicios profesionales..."
        },
        problema_principal: {
          label: "Necesidad principal que resolvéis",
          hint: "Explica qué situación quiere mejorar el cliente antes de contrataros. Puede ser un problema, una necesidad o un objetivo.",
          placeholder: "Ej. Nuestros clientes quieren conseguir más contactos, mejorar su imagen, ahorrar tiempo, vender más, organizar mejor su proceso o encontrar una solución fiable."
        },
        diferenciacion: {
          label: "Qué os hace diferentes",
          hint: "Evita respuestas genéricas. Piensa en vuestra forma de trabajar, especialización, experiencia, trato, resultados, rapidez, garantías o enfoque.",
          placeholder: "Ej. Servicio más personalizado, especialización en un tipo de cliente, método propio, acompañamiento cercano, resultados demostrables o experiencia específica."
        },
        por_que_elegir: {
          label: "Por qué deberían elegiros",
          hint: "Piensa en los motivos reales por los que un cliente confiaría en vosotros antes que en otra opción.",
          placeholder: "Ej. Por la experiencia, cercanía, especialización, claridad del proceso, resultados anteriores, confianza o facilidad para trabajar con vosotros."
        },
        percepcion_actual: {
          label: "Cómo os perciben ahora",
          hint: "Cómo crees que os ven actualmente clientes, contactos o mercado.",
          placeholder: "Ej. Cercanos, técnicos, tradicionales, poco visibles online, premium, rápidos, especializados..."
        },
        percepcion_deseada: {
          label: "Cómo queréis ser percibidos",
          hint: "Qué imagen debería transmitir la nueva web.",
          placeholder: "Ej. Más profesional, más premium, más cercana, más moderna, más experta o más orientada a resultados."
        },
        mensaje_clave: {
          label: "Mensaje principal de la web",
          hint: "La idea que una persona debería entender en los primeros segundos. No tiene que ser el titular definitivo.",
          placeholder: "Ej. Ayudamos a [tipo de cliente] a conseguir [resultado deseado] con [servicio o método diferencial]."
        }
      }
    },

    services: {
      tab: "Servicios",
      number: "02",
      title: "Servicios y prioridades",
      description: "Añade los servicios principales de la empresa. Esta información nos ayudará a decidir qué páginas crear, qué mensajes destacar y qué áreas conviene potenciar a nivel comercial y SEO.",
      addButton: "+ Añadir servicio",
      summaryFields: {
        servicio_principal: {
          label: "Servicio principal a potenciar",
          hint: "El servicio o línea de negocio que más interesa posicionar y vender.",
          placeholder: "Ej. Servicio principal, servicio estrella o solución más estratégica."
        },
        servicio_rentable: {
          label: "Servicio más rentable",
          hint: "No siempre coincide con el más vendido.",
          placeholder: "Ej. Servicio recurrente, tratamiento premium, asesoramiento completo..."
        },
        servicio_clientes: {
          label: "Servicio que queréis vender más en los próximos 6 meses",
          hint: "Esto marcará la prioridad SEO, de contenido y de diseño.",
          placeholder: "Ej. El servicio con mayor margen, más demanda o más potencial de crecimiento."
        },
        servicios_no_potenciar: {
          label: "Servicios que NO queréis potenciar",
          hint: "Ayuda a evitar leads poco interesantes o trabajos de bajo valor.",
          placeholder: "Ej. Servicios de bajo ticket, trabajos puntuales, solicitudes no rentables..."
        }
      },
      card: {
        title: "Servicio",
        deleteButton: "Eliminar",
        fields: {
          nombre: {
            label: "Nombre",
            placeholder: "Ej. Servicio principal, tratamiento, asesoramiento..."
          },
          prioridad: {
            label: "Prioridad",
            options: ["Alta", "Media", "Baja"]
          },
          rentabilidad: {
            label: "Rentabilidad",
            options: ["Alta", "Media", "Baja"]
          },
          cliente: {
            label: "Cliente ideal",
            hint: "¿Para quién está pensado este servicio?",
            placeholder: "Ej. Particulares, empresas, familias, propietarios, pacientes, alumnos, profesionales..."
          },
          problema: {
            label: "Qué necesidad cubre",
            hint: "Describe qué mejora, soluciona o facilita este servicio.",
            placeholder: "Ej. Resolver una urgencia, mejorar resultados, ahorrar tiempo, ganar visibilidad, reducir errores, sentirse más seguro..."
          }
        }
      }
    }
  }
};