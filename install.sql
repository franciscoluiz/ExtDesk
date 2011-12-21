CREATE DATABASE  IF NOT EXISTS `extdesk` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `extdesk`;
-- MySQL dump 10.13  Distrib 5.5.16, for Win32 (x86)
--
-- Host: 127.0.0.1    Database: extdesk
-- ------------------------------------------------------
-- Server version	5.5.8-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users_actions`
--

DROP TABLE IF EXISTS `users_actions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_actions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(45) DEFAULT NULL,
  `id_action` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_actions`
--

LOCK TABLES `users_actions` WRITE;
/*!40000 ALTER TABLE `users_actions` DISABLE KEYS */;
INSERT INTO `users_actions` VALUES (1,'Xcape','1');
/*!40000 ALTER TABLE `users_actions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_modules`
--

DROP TABLE IF EXISTS `users_modules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_modules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `User` varchar(20) DEFAULT NULL,
  `idModule` int(11) DEFAULT NULL,
  `shorcut` tinyint(4) DEFAULT NULL,
  `qLaunch` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_modules`
--

LOCK TABLES `users_modules` WRITE;
/*!40000 ALTER TABLE `users_modules` DISABLE KEYS */;
INSERT INTO `users_modules` VALUES 
(1,'Xcape',1,1,1),
(2,'Xcape',2,1,1),
(3,'Xcape',3,1,1),
(4,'Xcape',4,1,1),
(5,'Xcape',5,1,1),
(6,'Xcape',6,0,0),
(7,'Xcape',7,0,0),
(8,'Xcape',8,1,1),
(9,'Francisco',1,1,1),
(10,'Francisco',2,1,1),
(11,'Francisco',3,1,1),
(12,'Francisco',8,1,1);
/*!40000 ALTER TABLE `users_modules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modules`
--

DROP TABLE IF EXISTS `modules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `modules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `js` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `iconCls` varchar(45) DEFAULT NULL,
  `module` varchar(45) DEFAULT NULL,
  `iconLaunch` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modules`
--

LOCK TABLES `modules` WRITE;
/*!40000 ALTER TABLE `modules` DISABLE KEYS */;
INSERT INTO `modules` VALUES 
(1,'Notepad','Notepad','notepad-shortcut','notepad','icon-notepad'),
(2,'AccordionWindow','Accordion Window','accordion-shortcut','acc-win','icon-accordion'),
(3,'GridWindow','Grid Window','grid-shortcut','grid-win','icon-grid'),
(4,'SystemStatus','System Status','systemStatus-shortcut','systemstatus','icon-systemStatus'),
(5,'TabWindow','Tab Window','tab-shortcut','tab-win','icon-tab'),
(6,'BogusModule','Bogus Module','bugus-shortcut','bogus-menu',NULL),
(7,'BogusMenuModule','Bogus Menu Module','bugus-shortcut','bogus-menu','icon-bugus'),
(8,'Example','Example','example-shortcut','example-win','icon-example');
/*!40000 ALTER TABLE `modules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `P_Id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(254) COLLATE utf8_unicode_ci NOT NULL,
  `regdate` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `CpassReqDate` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `voucher` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `wallPaper` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `wpStretch` tinyint(1) DEFAULT NULL,
  `extrainfo1` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `extrainfo2` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `extrainfo3` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`P_Id`),
  UNIQUE KEY `id` (`P_Id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES 
(21,'Xcape','0944024e99eae16d3a062e03c745bae4b03a1a4c','xcape@extdesk.net','1316496013','','','Blue',1,'','','',1),
(22,'Francisco','0944024e99eae16d3a062e03c745bae4b03a1a4c','francisco@extdesk.net','1316495884','','','Desktop',1,'','','',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `actions`
--

DROP TABLE IF EXISTS `actions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `actions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `module` varchar(45) DEFAULT NULL,
  `option` varchar(45) DEFAULT NULL,
  `action` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actions`
--

LOCK TABLES `actions` WRITE;
/*!40000 ALTER TABLE `actions` DISABLE KEYS */;
INSERT INTO `actions` VALUES (1,'Settings','Wallpaper','Save');
/*!40000 ALTER TABLE `actions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2011-12-21 11:32:57
