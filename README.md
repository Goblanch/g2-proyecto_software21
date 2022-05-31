# quizgeon
Para ejecutar el Backend:

Tenéis que tener instalado https://nodejs.org/es/ la versión 16.15.0
Una vez instalado vais al visual studio y seleccionais la carpeta del Backend.
Vais a terminal, nuevo terminal y dentro de él ejecutáis el comando "npm i" y lugeo el comando "node app.js"

Para abrir el Frontend:
Tenéis que tener instalado el Apache y MySQL, para ello vais a esta web y descargáis Xampp https://www.apachefriends.org/es/index.html
Una vez instalado, se os abrirá un panel en el que tenéis que iniciar los dos primeros tal como se ve en la imagen.
![foto](https://user-images.githubusercontent.com/100932340/170835935-b6140aac-2117-45bb-a35e-e187858b8f73.jpg)

Tenéis que iros a la ruta http://localhost/phpmyadmin y ahí tendréis el acceso a la base de datos.
Arriba hay una pestaña que pone SQL, tenéis que copiar y pegar el contenido del archivo quizgeon.sql de este repositorio, con eso habréis importado la base de datos
![image](https://user-images.githubusercontent.com/100932340/170836187-2b063b89-1ab1-42a9-975e-0e1eef4298d1.png)
![image](https://user-images.githubusercontent.com/100932340/170836200-3d2a27ed-5a74-49c2-be65-1f66c4fa64ac.png)


Para realizar peticiones al servidor, debéis descargaros Postman desde esta web https://www.postman.com/downloads/  Tenéis que poner el tipo de petición (POST o GET). La url es http://localhost:3000/api/v1/(ruta de la petición) y los parámetros se pasan por el body o header, dependiendo del tipo de petición que hagas (puedes verlo en el archivo routes.js)
