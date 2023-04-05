# Práctica 9 - Aplicación de registro de Funko Pops
[![Tests](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct09-funko-app-alu0101048369/actions/workflows/testing.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct09-funko-app-alu0101048369/actions/workflows/testing.yml)
[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct09-funko-app-alu0101048369/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct09-funko-app-alu0101048369?branch=main)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2223_ull-esit-inf-dsi-22-23-prct09-funko-app-alu0101048369&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2223_ull-esit-inf-dsi-22-23-prct09-funko-app-alu0101048369)

- Miguel Dorta Rodríguez
- Miércoles 5 de abril de 2023
- Desarrollo de Sistemas Informáticos
- Grado en Ingeniería Informática
- Universidad de La Laguna

## Introducción
Para esta práctica se nos pedía realizar una aplicación de registro de Funkos, para familiarizarnos con las APIs de NodeJS para el manejo de archivos, la línea de comandos, y acostumbrarnos a usar dependencias para agilizar nuestro trabajo. Además de esto se nos ha pedido durante la sesión de prácticas realizar un conjunto de clases que simulen las funciones de `map` y `reduce` de un array numérico, pero siguiendo el patrón de template method, para familiarizarnos con nuevos patrones de diseño.

## Ejercicios
A continuación se describirán los diferentes ejercicios, el de la aplicación de registro de Funko Pops y el realizado durante la sesión de prácticas.

### Aplicación de registro de Funko Pops
Para este ejercicio se nos pedía realizar una aplicación de registro y manejo de Funko Pops. Esta aplicación no debe ser interactiva, usando únicamente argumentos de programa para leer los datos, y debe de implementar funcionalidad básica de manejo de objetos (añadir, modificar, eliminar, listar y mostrar). Además, se pedía que almacenase la información en un directorio que contiene una carpeta por usuario, y un archivo JSON por cada Funko Pop. Se pedía también que la aplicación mostrase toda salida ordinaria en color verde, y los errores en rojo. Por último, se pedía que múltiples usuarios pudiesen interaccionar con la aplicación, pero no de forma simultánea.

Para realizar el desarrollo de esta aplicación he decidido dividirla en dos partes (modelo y parseo de argumentos), además de una parte extra de utilidades.

#### Modelo
La parte de esta aplicación que he llamado modelo es la que contiene la lógica principal del programa. Se encuentra en la carpeta `src/p09/funko`, y contiene lo siguiente:
- **Clase Funko:** Representa los datos asociados a cada funko.
- **Clase Storage:** Representa un almacenador y manejador de funkos en disco. Su función es ofrecer métodos para trabajar con ellos. Cuando se crea un objeto de este tipo se bloquea el repositorio para cumplir el requisito de que múltiples usuarios no pueden trabajar de forma simultánea en él.
- **Enums:** FunkoGenre y FunkoType, representan los valores posibles que pueden tomar los campos `genre` y `type` en los Funkos.
- **Funciones de imprimir:** `printFunko` y `printUserFunkoCollection`, ofrecen una forma sencilla de imprimir funkos o colecciones de funkos. Aquí se implementa el requisito de imprimir el valor de mercado en diferentes colores según su valor. El ejercicio pedía realizar al menos 4 rangos, pero he decidido hacer un espectro completo que va desde rojo para 0 hasta verde para el funko de mayor valor en una colección, ofreciendo a efectos prácticos 256 rangos.
- **Interfaz FunkoData:** Representa los datos de los Funkos en los archivos JSON. Es la misma interfaz que la clase Funko omitiendo el campo `id` y los métodos.

#### Parseo de argumentos
Esta parte de la aplicación se encarga de tomar los argumentos con los que ha sido lanzado, procesarlos, y ejecutar lo que se ha solicitado a través de ellos. Se encuentra en la carpeta `src/p09/cmd`, y contiene una estructura de archivos que enlaza 1:1 con los comandos de la aplicación:
- **index.ts**: Contiene el comando vacío de la aplicación. Si consideramos los comandos como un árbol, este es la raíz.
- **(add/list/read/remove/update).ts**: Contiene el constructor y generador de cada comando.
- **common.ts**: Contiene funciones y tipos comunes a múltiples comandos.

Como nota a destacar, he decidido usar un acercamiento parecido a las herramientas de los sistemas UNIX o UNIX-like, en la que cuando una operación se realiza correctamente no se ofrece ningún output, reservándose este para errores o funcionalidades que requieran output (como listar o mostrar).

#### Utilidades
Esta parte de la aplicación ofrece funciones que simplemente agilizan el manejo de cosas. Se encuentra en la carpeta `src/p09/utils` y contiene los siguientes archivos:
- **errors.ts**: Contiene interfaces y funciones para agilizar la detección y manejo de Errors y SystemErrors en TypeScript.
- **lockfile.ts**: Contiene funciones y variables para facilitar el bloqueo del directorio. Esta es la única parte del código que infringe flagrantemente los principios SOLID, pues contiene una variable global (no expuesta), pero esto facilita muchísimo el diseño de esta parte de la aplicación. Además, otra parte criticable de este código es que el método de bloqueo de archivos es muy débil y está sujeto a "quedarse colgado" si un programa acaba de forma prematura sin eliminar el archivo. Hay formas más inteligentes de hacer esto, [formas que he implementado por mi cuenta con anterioridad en otros lenguajes](https://github.com/Miguel-Dorta/si), pero veía excesivo usar llamadas al sistema para este punto cuando probablemente la mayoría de mis compañeros habrán pasado por alto este punto y, los que no, probablemente no implementarán una solución más compleja que esta.

### PE102 - MapReduce
En esta sesión de prácticas se nos pedía realizar, siguiendo el patrón de diseño template method, una clase abstracta para implementar funcionalidades similares a `map` y `reduce` para arrays numéricos, y esta clase ha de servir de base para las otras que hagan implementaciones de sus métodos. La clase base la he llamado `MapReduce` y únicamente contiene los siguientes métodos:
- **reduce:** método abstracto para implementar en las subclases.
- **map:** método que realiza la operación de mapeo en un array numérico. Ejecuta el hook `mapPreProcessListHook` antes de empezar a realizarlo, el método `mapFn` con cada elemento, y el hook `mapPostProcessListHook` después de realizarlo.
- **mapFn:** método que se realizará con cada elemento en las operaciones de `map`. Está pensado para ser sobrescrito por clases hijas y su comportamiento por defecto es devolver el mismo número que se ha proporcionado.
- **mapPreProcessListHook:** hook que se ejecutará antes de hacer la operación de mapeo en un array numérico. Está pensado para ser sobrescrito por clases hijas y su comportamiento por defecto es no modificar el array.
- **mapPostProcessListHook:** hook que se ejecutará después de hacer la operación de mapeo en un array numérico. Está pensado para ser sobrescrito por clases hijas y su comportamiento por defecto es no modificar el array.

A partir de esta clase se crean subclases que la especializan. En este caso se ha decidido implementar las siguientes:
- **AddMapReduce:** En la operación de `map` suma 1 a cada elemento, y en la operación de `reduce` los suma todos al valor inicial.
- **SubMapReduce:** En la operación de `map` resta 1 a cada elemento, y en la operación de `reduce` los resta todos al valor inicial.
- **ProdMapReduce:** En la operación de `map` multiplica por 2 a cada elemento, y en la operación de `reduce` multiplica el valor inicial con todos.
- **DivMapReduce:** En la operación de `map` divide entre 2 a cada elemento, y en la operación de `reduce` divide el valor inicial con todos.

## Dificultades encontradas
La mayor dificultad encontrada en esta práctica ha sido familiarizarme con las nuevas librerías que estamos usando, especialmente con `yargs` pues, como consecuencia de lo potente y flexible que es, tiene una documentación bastante extensa. Otra de las mayores dificultades encontradas ha sido el parseo de errores de Node pues, al menos para Node 14, no devuelve errores que sean instancias de ninguna clase, y además la API `node:fs` no expone públicamente sus tipos de error, por lo que he tenido que implementarme funciones para manejarlos de forma cómoda.

## Conclusión
Gracias a esta práctica hemos podido familiarizarnos con las APIs de NodeJS para el manejo de archivos, además de haber aprendido de forma práctica a hacer una implementación de clases que siga el patrón de diseño template method. A parte de esto, a mí personalmente me ha servido para familiarizarme con herramientas para el diseño de aplicaciones por terminal como `chalk` y `yargs`, que sin duda me serán muy útiles para el diseño de futuras aplicaciones.
