-- MariaDB dump 10.19  Distrib 10.4.24-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: quizzgeon
-- ------------------------------------------------------
-- Server version	10.4.24-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `preguntas`
--
CREATE DATABASE `quizgeon`;
USE `quizgeon`;

DROP TABLE IF EXISTS `preguntas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `preguntas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pregunta` varchar(255) NOT NULL,
  `opciones` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`opciones`)),
  `respuestaCorrecta` varchar(1) NOT NULL,
  `inforRelevante` varchar(255) NOT NULL,
  `dificultad` int(1) NOT NULL,
  `disponible` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `preguntas`
--

LOCK TABLES `preguntas` WRITE;
/*!40000 ALTER TABLE `preguntas` DISABLE KEYS */;
INSERT INTO `preguntas` VALUES (3,'¿Pregunta1?','{\"a\":\"123\", \"b\":\"456\", \"c\":\"789\",\"d\":\"1232\"}','a','d',0,1),(4,'¿Pregunta2?','{\"a\":\"123\", \"b\":\"456\", \"c\":\"789\",\"d\":\"1232\"}','a','d',0,1),(5,'¿Pregunta3?','{\"a\":\"123\", \"b\":\"456\", \"c\":\"789\",\"d\":\"1232\"}','a','d',0,1),(6,'¿Pregunta24?','{\"a\":\"123\", \"b\":\"456\", \"c\":\"789\",\"d\":\"1232\"}','a','d',0,1),(7,'¿Pregunta25?','{\"a\":\"123\", \"b\":\"456\", \"c\":\"789\",\"d\":\"1232\"}','a','d',0,1),(8,'¿Pregunta26?','{\"a\":\"123\", \"b\":\"456\", \"c\":\"789\",\"d\":\"1232\"}','a','d',1,1),(9,'¿Pregunta27?','{\"a\":\"123\", \"b\":\"456\", \"c\":\"789\",\"d\":\"1232\"}','a','d',1,1),(10,'¿Pregunta28?','{\"a\":\"123\", \"b\":\"456\", \"c\":\"789\",\"d\":\"1232\"}','a','d',1,1),(11,'¿Pregunta29?','{\"a\":\"123\", \"b\":\"456\", \"c\":\"789\",\"d\":\"1232\"}','a','d',1,1),(12,'¿Pregunta12?','{\"a\":\"123\", \"b\":\"456\", \"c\":\"789\",\"d\":\"1232\"}','a','d',1,1),(13,'¿Pregunta23?','{\"a\":\"123\", \"b\":\"456\", \"c\":\"789\",\"d\":\"1232\"}','a','d',1,1),(14,'¿Pregunta233?','{\"a\":\"123\", \"b\":\"456\", \"c\":\"789\",\"d\":\"1232\"}','a','d',2,1),(15,'¿Pregunta23?','{\"a\":\"123\", \"b\":\"456\", \"c\":\"789\",\"d\":\"1232\"}','a','d',2,1),(16,'¿Pregunta2444?','{\"a\":\"123\", \"b\":\"456\", \"c\":\"789\",\"d\":\"1232\"}','a','d',2,1),(17,'¿Pregunta12?','{\"a\":\"123\", \"b\":\"456\", \"c\":\"789\",\"d\":\"1232\"}','a','d',2,1),(18,'¿Pregunta123?','{\"a\":\"123\", \"b\":\"456\", \"c\":\"789\",\"d\":\"1232\"}','a','d',2,1),(19,'¿Pregunta9?','{\"a\":\"123\", \"b\":\"456\", \"c\":\"789\",\"d\":\"1232\"}','a','d',2,1);
/*!40000 ALTER TABLE `preguntas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(32) NOT NULL,
  `password` varchar(64) NOT NULL,
  `token` varchar(255) NOT NULL,
  `rank` int(11) NOT NULL DEFAULT 0,
  `intentoDiario` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','40bd001563085fc35165329ea1ff5c5ecbdbbeef','7af2d10b73ab7cd8f603937f7697cb5fe432c7ff',1,0),(2,'123','7782391677c36f0f0e77363c7ef182e4e75e7669','1748c45ca3a8d8a106f8b5ef64ac001f6bc7b968',0,0),(26,'Ivan','40bd001563085fc35165329ea1ff5c5ecbdbbeef','3c95a03c691edde894ac7bbf1a1628f92b1f1448',0,1),(27,'Jorge','40bd001563085fc35165329ea1ff5c5ecbdbbeef','8e94a9dd2203d51b97dab7e1afa70ad3abe252dc',0,1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-31 19:27:04
