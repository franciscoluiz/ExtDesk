
DROP TABLE IF EXISTS `user_preferences`;
CREATE TABLE `user_preferences` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUser` int(11) DEFAULT NULL,
  `idModule` int(11) DEFAULT NULL,
  `shorcut` int(11) DEFAULT NULL,
  `qLaunch` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

LOCK TABLES `user_preferences` WRITE;

INSERT INTO `user_preferences` 
VALUES 
(1,1,1,0,0),
(2,1,2,1,1),
(3,2,1,1,1),
(4,2,2,1,1),
(5,2,3,1,1),
(6,2,4,1,1),
(7,2,5,1,1),
(8,2,6,1,1),
(9,2,7,1,1),
(10,2,8,0,0),
(11,2,9,0,0),
(12,2,10,1,0),
(13,2,11,1,0);

UNLOCK TABLES;

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `P_Id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(254) COLLATE utf8_unicode_ci NOT NULL,
  `regdate` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `CpassReqDate` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `voucher` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `wallPaper` varchar(45) COLLATE utf8_unicode_ci DEFAULT 'Desk',
  `theme` varchar(45) COLLATE utf8_unicode_ci DEFAULT 'blue',
  `wpStretch` tinyint(1) DEFAULT NULL,
  `extrainfo1` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `extrainfo2` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `extrainfo3` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`P_Id`),
  UNIQUE KEY `id` (`P_Id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM AUTO_INCREMENT=59 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `users` WRITE;

INSERT INTO `users` VALUES 
(1,'Xcape','0944024e99eae16d3a062e03c745bae4b03a1a4c','xcape@extdesk.net','1316496013','','','Blue','blue',1,'','','',1),
(2,'Francisco','0944024e99eae16d3a062e03c745bae4b03a1a4c','francisco@extdesk.net','1316495884','','','Dark-Sencha','gray',1,'','','',1),
(4,'Arion','0944024e99eae16d3a062e03c745bae4b03a1a4c','arion@extdesk.net','1316495884','','','Desk','green',1,'','','',1),
(5,'test','050b77b6a25c24b1a5b3f87644d3e51f03a0450b','test@hotmail.com','','','',NULL,'blue',NULL,'','','',1);

UNLOCK TABLES;

DROP TABLE IF EXISTS `groups_actions`;


CREATE TABLE `groups_actions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idGroups` int(11) DEFAULT NULL,
  `idActions` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=latin1;

LOCK TABLES `groups_actions` WRITE;


INSERT INTO `groups_actions` VALUES 
(2,1,2),(3,1,3),(4,1,4),(5,1,5),(6,1,6),
(7,1,7),(8,1,8),(9,1,9),(10,1,10),(11,1,11),
(12,1,12),(13,1,13),(14,1,14),(15,1,15),(16,1,16),
(17,1,17),(18,1,18),(19,1,19),(20,2,1),(21,2,2),
(22,2,3),(23,2,4),(24,2,5),(25,2,6),(26,2,7),(27,2,8),
(28,2,9),(29,2,10),(30,2,11),(31,2,12),(32,2,13),(33,2,14),
(34,2,15),(35,2,16),(36,2,17),(37,2,18),(38,2,19),(39,2,20),
(40,2,21),(41,2,22);

UNLOCK TABLES;

DROP TABLE IF EXISTS `modules`;

CREATE TABLE `modules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `js` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `iconCls` varchar(45) DEFAULT NULL,
  `module` varchar(45) DEFAULT NULL,
  `iconLaunch` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

LOCK TABLES `modules` WRITE;

INSERT INTO `modules` VALUES 
(1,'Settings','Settings',NULL,NULL,NULL),
(2,'Admin','Admin','admin-shortcut','admin-win','icon-admin'),
(3,'Notepad','Notepad','notepad-shortcut','notepad','icon-notepad'),
(4,'AccordionWindow','Accordion Window','accordion-shortcut','acc-win','icon-accordion'),
(5,'GridWindow','Grid Window','grid-shortcut','grid-win','icon-grid'),
(6,'SystemStatus','System Status','systemStatus-shortcut','systemstatus','icon-systemStatus'),
(7,'TabWindow','Tab Window','tab-shortcut','tab-win','icon-tab'),
(8,'BogusModule','Bogus Module','bugus-shortcut','bogus-menu',NULL),
(9,'BogusMenuModule','Bogus Menu Module','bugus-shortcut','bogus-menu','icon-bugus'),
(10,'Example1','Example1','example-shortcut','example1-win','icon-example'),
(11,'Example2','Example2','example-shortcut','example2-win','example-shortcut');

UNLOCK TABLES;

DROP TABLE IF EXISTS `actions`;

CREATE TABLE `actions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `module` varchar(45) DEFAULT NULL,
  `option` varchar(45) DEFAULT NULL,
  `action` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

LOCK TABLES `actions` WRITE;

INSERT INTO `actions` VALUES 
(1,'Settings','Wallpaper','Save'),
(2,'Admin','Users','List'),
(3,'Admin','Users','Save'),
(4,'Admin','Users','Delete'),
(5,'Admin','Modules','List'),
(6,'Admin','Modules','Save'),
(7,'Admin ','Modules','Delete'),
(8,'Admin','Actions','List'),
(9,'Admin','Actions','Save'),
(10,'Admin','Actions','Delete'),
(11,'Admin','Groups','List'),
(12,'Admin','Groups','Save'),
(13,'Admin','Groups','Delete'),
(14,'Admin','ModulesinGroups','List'),
(15,'Admin','ModulesinGroups','Save'),
(16,'Admin','ActionsinGroups','List'),
(17,'Admin','ActionsinGroups','Save'),
(18,'Admin','GroupsinUser','List'),
(19,'Admin','GroupsinUser','Save'),
(20,'Settings','Shortcuts','Save'),
(21,'Settings','QLaunchs','Save'),
(22,'Settings','Theme','Save');

UNLOCK TABLES;

DROP TABLE IF EXISTS `user_groups`;

CREATE TABLE `user_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUser` int(11) DEFAULT NULL,
  `idGroup` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

LOCK TABLES `user_groups` WRITE;

INSERT INTO `user_groups` VALUES (1,1,1),(2,1,2),(3,2,1),(4,2,2),(5,3,2);

UNLOCK TABLES;

DROP TABLE IF EXISTS `groups`;

CREATE TABLE `groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group` varchar(20) DEFAULT NULL,
  `description` varchar(75) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `group_UNIQUE` (`group`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

LOCK TABLES `groups` WRITE;

INSERT INTO `groups` VALUES 
(1,'Administrator','Full User',1),
(2,'DemoGroup','Only can save wallpaper',1);


UNLOCK TABLES;

DROP TABLE IF EXISTS `groups_modules`;

CREATE TABLE `groups_modules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idGroups` int(11) DEFAULT NULL,
  `idModules` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idgroups` (`idGroups`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=latin1;

LOCK TABLES `groups_modules` WRITE;

INSERT INTO `groups_modules` VALUES 
(1,1,2),(3,2,2),(4,2,3),(5,2,4),(6,2,5),
(7,2,6),(8,2,7),(9,2,8),(10,2,9),(11,2,10),
(12,2,11),(96,2,1);

UNLOCK TABLES;
