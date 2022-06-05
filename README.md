# quizgeon

El proyecto se basa de dos partes, Backend y Frontend. El backend es la parte del servidor que se ejecuta bajo NodeJS y el Frontend está hecho en ReactJS y se compila y se ejecuta como una web estática.

Para ejecutar el Backend:
La API se intentará conectar a una base de datos MySQL llamada "quizgeon", recuerda que debes tener instalado MySQL en tu ordenador. Para ello puedes descargar XAMPP desde esta web https://www.apachefriends.org/es/index.html . Una vez se ha descargado e instalado, inicias MySQL y Apache tal como se ve en esta imagen: ![foto](https://user-images.githubusercontent.com/100932340/170835935-b6140aac-2117-45bb-a35e-e187858b8f73.jpg)
Tienes que ir a la URL http://localhost/phpmyadmin y ahí podrás acceder a la base de datos.
Arriba hay una pestaña que pone SQL, tienes que copiar y pegar el contenido del archivo quizgeon.sql de este repositorio, con eso habrás importado la base de datos del proyecto.
![image](https://user-images.githubusercontent.com/100932340/170836187-2b063b89-1ab1-42a9-975e-0e1eef4298d1.png)
![image](https://user-images.githubusercontent.com/100932340/170836200-3d2a27ed-5a74-49c2-be65-1f66c4fa64ac.png)


Debes tener instalado https://nodejs.org/es/ la versión 16.15.0 (Recomendada para la mayoría).
Una vez instalado abres la carpeta Backend en el Visual Studio, inicias un nuevo terminal dentro del editor de código y ejecutas el comando "npm install" para instalar todas las dependencias del proyecto.
Una vez se han instalado las dependencias, ejecutas el comando "npm start" y se iniciaría la API del proyecto. Recuerda tener iniciada la base de datos en XAMPP.

Para ejecutar el Frontend-React:
Tienes que descargar la carpeta Frontend-React de este repositorio y abrirla con el Visual Studio. Una vez hecho esto, abres una nueva terminal dentro del editor de código y ejecutas el comando "npm install" para instalar todas las dependencias del proyecto. Cuando ha terminado de instalarse, debes ejecutar el comando "npm start" y se abrirá una web en tu navegador con esta dirección http://localhost:3000 Ahí podrás ver la interfaz web. Recuerda que para que funcione correctamente la web, debes tener iniciado el Backend (API) y la base de datos en XAMPP (MySQL y Apache).
