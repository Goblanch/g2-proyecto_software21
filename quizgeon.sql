-- phpMyAdmin SQL Dump
-- version 4.6.6deb5ubuntu0.5
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 04-06-2022 a las 12:17:54
-- Versión del servidor: 5.7.38-0ubuntu0.18.04.1
-- Versión de PHP: 7.2.24-0ubuntu0.18.04.11
CREATE DATABASE `quizgeon`;
USE `quizgeon`;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `quizgeon`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preguntas`
--

CREATE TABLE `preguntas` (
  `id` int(11) NOT NULL,
  `pregunta` varchar(255) NOT NULL,
  `opciones` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `respuestaCorrecta` varchar(1) NOT NULL,
  `inforRelevante` varchar(255) NOT NULL,
  `dificultad` int(1) NOT NULL,
  `disponible` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `preguntas`
--

INSERT INTO `preguntas` (`id`, `pregunta`, `opciones`, `respuestaCorrecta`, `inforRelevante`, `dificultad`, `disponible`) VALUES
(28, '¿Cuál es la flor nacional de Japón?', '{\"a\":\"Rosa\",\"b\":\"Flor de Cerezo\",\"c\":\"Margarita\",\"d\":\"Clavel\"}', 'b', 'Esta flor o «sakura» es la flor nacional y símbolo de Japón. Las frágiles flores que este contiene en la época del Hanabi,son el símbolo de lo bella que es la primavera', 0, 1),
(30, '¿Cuál es el animal nacional de Australia?', '{\"a\":\"Oso\",\"b\":\"León\",\"c\":\"Canguro\",\"d\":\"Ornitorrinco\"}', 'c', 'Se estima que hay entre 40 y 50 millones de animales de esta especie en Australia. Es un animal de tal importancia que incluso aparece en el escudo australiano.', 0, 1),
(31, '¿Cuántos días le toma a la tierra dar una vuelta a la órbita del sol?', '{\"a\":\"365\",\"b\":\"360\",\"c\":\"300\",\"d\":\"370\"}', 'a', 'Este recorrido, que se conoce como movimiento de traslación.', 0, 1),
(32, '¿Cuál de los siguientes imperios no tenía un idioma escrito?', '{\"a\":\"Inca\",\"b\":\"Aztecas\",\"c\":\"Egipcios\",\"d\":\"Maya\"}', 'a', 'La transmisión de ideas en el imperio se hacía en base a señales o marcas adheridos a unas cuerda de lana o algodón denominadas \"\"quipu\"\".', 2, 1),
(33, '¿Cómo se llamaba Istanbul antes de 1923?', '{\"a\":\"Istanbul 2.0\",\"b\":\"Constantinopla\",\"c\":\"Estambul\",\"d\":\"Bizanzio\"}', 'b', 'La ciudad tenía ese nombre en honor a su emperador, que la hizo capital del imperio romano en el año 333 d.C.', 1, 1),
(34, '¿Cuál es el país más grande del mundo?', '{\"a\":\"China\",\"b\":\"Rusia\",\"c\":\"India\",\"d\":\"Canadá\"}', 'b', 'Este país tiene una extensión de 17,1 millones de km cuadrados y tiene una población de 144 millones de habitantes.', 0, 1),
(35, '¿De qué ciudad son originarios los Beatles?', '{\"a\":\"Londres\",\"b\":\"Dublín\",\"c\":\"Liverpool\",\"d\":\"Manchester\"}', 'c', 'La famosa banda de rock británica se formó a principios de los años 60 y se disolvió oficialmente en 1970.', 1, 1),
(36, '¿Cuántas teclas tiene un piano?', '{\"a\":\"100\",\"b\":\"88\",\"c\":\"90\",\"d\":\"61\"}', 'b', 'Aunque hay pianos con 49 o 61 teclas, los pianos estándares y de mayor calidad están formados por otro número de teclas.', 2, 1),
(37, '¿Qué artista pinto el techo de la Capilla Sixtina en Roma?', '{\"a\":\"Miguel Ángel\",\"b\":\"Dalí\",\"c\":\"Leonardo da Vinci\",\"d\":\"Monet\"}', 'a', 'El artista italiano pintó los frescos de la bóveda de la capilla Sixtina entre 1508 y 1512.', 0, 1),
(38, '¿Cuál es el nombre del río más largo del mundo?', '{\"a\":\"Río Nilo\",\"b\":\"Río Amazonas\",\"c\":\"Río Danubio\",\"d\":\"Río Volga\"}', 'b', 'El Amazonas se encuentra en América del Sur y tiene una longitud de unos 6800 km.', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user` varchar(32) NOT NULL,
  `password` varchar(64) NOT NULL,
  `token` varchar(255) NOT NULL,
  `rank` int(11) NOT NULL DEFAULT '0',
  `intentoDiario` tinyint(1) NOT NULL DEFAULT '1',
  `numAcierto` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `user`, `password`, `token`, `rank`, `intentoDiario`, `numAcierto`) VALUES
(1, 'Admin', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', '7af2d10b73ab7cd8f603937f7697cb5fe432c7ff', 1, 1, 3),
(32, 'skippy', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', '47211fc10a490e5130328edcca8e423cfdcf8e16', 0, 1, 0),
(34, 'Blas', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', '2364479c6b503aac977dca0e850cfb65c976c88c', 0, 1, 8),
(35, 'lol', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', '99efc50a9206bde3d7a8e694aad8e138ca7dc3f7', 0, 0, 3);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `preguntas`
--
ALTER TABLE `preguntas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `preguntas`
--
ALTER TABLE `preguntas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
