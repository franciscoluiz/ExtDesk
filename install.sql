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
-- Table structure for table `user_preferences`
--

DROP TABLE IF EXISTS `user_preferences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_preferences` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUser` int(11) DEFAULT NULL,
  `idModule` int(11) DEFAULT NULL,
  `shorcut` int(11) DEFAULT NULL,
  `qLaunch` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_preferences`
--

LOCK TABLES `user_preferences` WRITE;
/*!40000 ALTER TABLE `user_preferences` DISABLE KEYS */;
INSERT INTO `user_preferences` VALUES (1,1,1,0,0),(2,1,2,1,1),(3,2,1,1,1),(4,2,2,1,1),(5,2,3,1,1),(6,2,4,1,1),(7,2,5,1,1),(8,2,6,1,1),(9,2,7,1,1),(10,2,8,0,0),(11,2,9,0,0),(12,2,10,1,1),(13,2,11,1,1);
/*!40000 ALTER TABLE `user_preferences` ENABLE KEYS */;
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
) ENGINE=MyISAM AUTO_INCREMENT=59 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Xcape','0944024e99eae16d3a062e03c745bae4b03a1a4c','xcape@extdesk.net','1316496013','','','Blue',1,'','','',1),(2,'Francisco','0944024e99eae16d3a062e03c745bae4b03a1a4c','francisco@extdesk.net','1316495884','','','Blue',1,'','','',1),(4,'Arion','0944024e99eae16d3a062e03c745bae4b03a1a4c','arion@extdesk.net','1316495884','','','Desk',1,'','','',1),(5,'test','050b77b6a25c24b1a5b3f87644d3e51f03a0450b','test@hotmail.com','','','',NULL,NULL,'','','',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groups_actions`
--

DROP TABLE IF EXISTS `groups_actions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `groups_actions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idGroups` int(11) DEFAULT NULL,
  `idActions` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups_actions`
--

LOCK TABLES `groups_actions` WRITE;
/*!40000 ALTER TABLE `groups_actions` DISABLE KEYS */;
INSERT INTO `groups_actions` VALUES (2,1,2),(3,1,3),(4,1,4),(5,1,5),(6,1,6),(7,1,7),(8,1,8),(9,1,9),(10,1,10),(11,1,11),(12,1,12),(13,1,13),(14,1,14),(15,1,15),(16,1,16),(17,1,17),(18,1,18),(19,1,19),(20,2,1),(21,2,2),(22,2,3),(23,2,4),(24,2,5),(25,2,6),(26,2,7),(27,2,8),(28,2,9),(29,2,10),(30,2,11),(31,2,12),(32,2,13),(33,2,14),(34,2,15),(35,2,16),(36,2,17),(37,2,18),(38,2,19);
/*!40000 ALTER TABLE `groups_actions` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modules`
--

LOCK TABLES `modules` WRITE;
/*!40000 ALTER TABLE `modules` DISABLE KEYS */;
INSERT INTO `modules` VALUES (1,'Settings','Settings',NULL,NULL,NULL),(2,'Admin','Admin','admin-shortcut','admin-win','icon-admin'),(3,'Notepad','Notepad','notepad-shortcut','notepad','icon-notepad'),(4,'AccordionWindow','Accordion Window','accordion-shortcut','acc-win','icon-accordion'),(5,'GridWindow','Grid Window','grid-shortcut','grid-win','icon-grid'),(6,'SystemStatus','System Status','systemStatus-shortcut','systemstatus','icon-systemStatus'),(7,'TabWindow','Tab Window','tab-shortcut','tab-win','icon-tab'),(8,'BogusModule','Bogus Module','bugus-shortcut','bogus-menu',NULL),(9,'BogusMenuModule','Bogus Menu Module','bugus-shortcut','bogus-menu','icon-bugus'),(10,'Example1','Example1','example-shortcut','example1-win','icon-example'),(11,'Example2','Example2','example-shortcut','example2-win','example-shortcut');
/*!40000 ALTER TABLE `modules` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actions`
--

LOCK TABLES `actions` WRITE;
/*!40000 ALTER TABLE `actions` DISABLE KEYS */;
INSERT INTO `actions` VALUES (1,'Settings','Wallpaper','Save'),(2,'Admin','Users','List'),(3,'Admin','Users','Save'),(4,'Admin','Users','Delete'),(5,'Admin','Modules','List'),(6,'Admin','Modules','Save'),(7,'Admin ','Modules','Delete'),(8,'Admin','Actions','List'),(9,'Admin','Actions','Save'),(10,'Admin','Actions','Delete'),(11,'Admin','Groups','List'),(12,'Admin','Groups','Save'),(13,'Admin','Groups','Delete'),(14,'Admin','ModulesinGroups','List'),(15,'Admin','ModulesinGroups','Save'),(16,'Admin','ActionsinGroups','List'),(17,'Admin','ActionsinGroups','Save'),(18,'Admin','GroupsinUser','List'),(19,'Admin','GroupsinUser','Save'),(20,'Settings','Shortcuts','Save'),(21,'Settings','QLaunchs','');
/*!40000 ALTER TABLE `actions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_groups`
--

DROP TABLE IF EXISTS `user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUser` int(11) DEFAULT NULL,
  `idGroup` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_groups`
--

LOCK TABLES `user_groups` WRITE;
/*!40000 ALTER TABLE `user_groups` DISABLE KEYS */;
INSERT INTO `user_groups` VALUES (1,1,1),(2,1,2),(3,2,1),(4,2,2),(5,3,2);
/*!40000 ALTER TABLE `user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group` varchar(20) DEFAULT NULL,
  `description` varchar(75) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `group_UNIQUE` (`group`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups`
--

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT INTO `groups` VALUES (1,'Administrator','Full User',1),(2,'DemoGroup','Only can save wallpaper',1);
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groups_modules`
--

DROP TABLE IF EXISTS `groups_modules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `groups_modules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idGroups` int(11) DEFAULT NULL,
  `idModules` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idgroups` (`idGroups`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups_modules`
--

LOCK TABLES `groups_modules` WRITE;
/*!40000 ALTER TABLE `groups_modules` DISABLE KEYS */;
INSERT INTO `groups_modules` VALUES (1,1,2),(3,2,2),(4,2,3),(5,2,4),(6,2,5),(7,2,6),(8,2,7),(9,2,8),(10,2,9),(11,2,10),(12,2,11),(96,2,1);
/*!40000 ALTER TABLE `groups_modules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'extdesk'
--

--
-- Dumping routines for database 'extdesk'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2012-04-07 15:16:51
