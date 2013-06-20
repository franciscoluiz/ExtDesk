DROP TABLE IF EXISTS `modules`;
CREATE TABLE IF NOT EXISTS `modules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `js` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `iconCls` varchar(45) DEFAULT NULL,
  `module` varchar(45) DEFAULT NULL,
  `iconLaunch` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB COLLATE='utf8_general_ci' AUTO_INCREMENT=12;


INSERT INTO `modules` (`id`, `js`, `name`, `iconCls`, `module`, `iconLaunch`) VALUES 
(1,'Admin','Admin','admin-shortcut','admin-win','icon-admin'),
(2,'Settings','Settings',NULL,NULL,NULL),
(3, 'Notepad', 'Notepad', 'notepad-shortcut', 'notepad', 'icon-notepad'),
(4, 'AccordionWindow', 'Accordion Window', 'accordion-shortcut', 'acc-win', 'icon-accordion'),
(5, 'GridWindow', 'Grid Window', 'grid-shortcut', 'grid-win', 'icon-grid'),
(6, 'SystemStatus', 'System Status', 'systemStatus-shortcut', 'systemstatus', 'icon-systemStatus'),
(7, 'TabWindow', 'Tab Window', 'tab-shortcut', 'tab-win', 'icon-tab'),
(8, 'BogusModule', 'Bogus Module', 'bugus-shortcut', 'bogus-menu', NULL),
(9, 'BogusMenuModule', 'Bogus Menu Module', 'bugus-shortcut', 'bogus-menu', 'icon-bugus'),
(10, 'Example1', 'Example1', 'example-shortcut', 'example1-win', 'icon-example'),
(11, 'Example2', 'Example2', 'example-shortcut', 'example2-win', 'example-shortcut'),
(12, 'Wizard', 'Wizard', 'wizard-shortcut', 'wizard-win', 'wizard-shortcut');




DROP TABLE IF EXISTS `actions`;
CREATE TABLE IF NOT EXISTS `actions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `module` varchar(45) DEFAULT NULL,
  `option` varchar(45) DEFAULT NULL,
  `action` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB COLLATE='utf8_general_ci' AUTO_INCREMENT=23;

INSERT INTO `actions` (`id`, `module`, `option`, `action`) VALUES 
(1,'Admin','Users','List'),
(2,'Admin','Users','Save'),
(3,'Admin','Users','Delete'),
(4,'Admin','Modules','List'),
(5,'Admin','Modules','Save'),
(6,'Admin','Modules','Delete'),
(7,'Admin','Actions','List'),
(8,'Admin','Actions','Save'),
(9,'Admin','Actions','Delete'),
(10,'Admin','Groups','List'),
(11,'Admin','Groups','Save'),
(12,'Admin','Groups','Delete'),
(13,'Admin','ModulesinGroups','List'),
(14,'Admin','ModulesinGroups','Save'),
(15,'Admin','ActionsinGroups','List'),
(16,'Admin','ActionsinGroups','Save'),
(17,'Admin','GroupsinUser','List'),
(18,'Admin','GroupsinUser','Save'),
(19,'Settings','Wallpaper','Save'),
(20,'Settings','Shortcuts','Save'),
(21,'Settings','QLaunchs','Save'),
(22,'Settings','Theme','Save'),
(23,'Wizard','Module','Make');


DROP TABLE IF EXISTS `groups`;
CREATE TABLE IF NOT EXISTS `groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group` varchar(20) DEFAULT NULL,
  `description` varchar(75) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `group_UNIQUE` (`group`)
) ENGINE=InnoDB COLLATE='utf8_general_ci' AUTO_INCREMENT=4;

INSERT INTO `groups` (`id`, `group`, `description`, `active`) VALUES 
(1,'Administrator','Can access only admin modules', 1),
(2,'DemoGroup','Only can save wallpaper', 1),
(3,'Full Access','Can access all modules with all actions', 1 );




DROP TABLE IF EXISTS `groups_actions`;
CREATE TABLE IF NOT EXISTS `groups_actions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idGroups` int(11) DEFAULT NULL,
  `idActions` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB COLLATE='utf8_general_ci' AUTO_INCREMENT=49;

INSERT INTO `groups_actions` (`id`, `idGroups`, `idActions`) VALUES 
(1,1,1),
(2,1,2),
(3,1,3),
(4,1,4),
(5,1,5),
(6,1,6),
(7,1,7),
(8,1,8),
(9,1,9),
(10,1,10),
(11,1,11),
(12,1,12),
(13,1,13),
(14,1,14),
(15,1,15),
(16,1,16),
(17,1,17),
(18,1,18),
(19,1,19),
(20,1,20),
(21,1,21),
(22,1,22),
(23,2,19),
(24,2,20),
(25,2,21),
(26,2,22),
(27,3,1),
(28,3,2),
(29,3,3),
(30,3,4),
(31,3,5),
(32,3,6),
(33,3,7),
(34,3,8),
(35,3,9),
(36,3,10),
(37,3,11),
(38,3,12),
(39,3,13),
(40,3,14),
(41,3,15),
(42,3,16),
(43,3,17),
(44,3,18),
(45,3,19),
(46,3,20),
(47,3,21),
(48,3,22),
(49,3,23);




DROP TABLE IF EXISTS `groups_modules`;
CREATE TABLE IF NOT EXISTS `groups_modules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idGroups` int(11) DEFAULT NULL,
  `idModules` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idgroups` (`idGroups`)
) ENGINE=InnoDB COLLATE='utf8_general_ci' AUTO_INCREMENT=15;

INSERT INTO `groups_modules` (`id`, `idGroups`, `idModules`) VALUES 
(1,1,1),
(2,1,2),
(3,2,2),
(4,3,1),
(5,3,2),
(6,3,3),
(7,3,4),
(8,3,5),
(9,3,6),
(10,3,7),
(11,3,8),
(12,3,9),
(13,3,10),
(14,3,11),
(15,3,12);




DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
	`P_Id` INT(11) NOT NULL AUTO_INCREMENT,
	`username` VARCHAR(200) NOT NULL,
	`password` VARCHAR(200) NOT NULL,
	`email` VARCHAR(254) NOT NULL,
	`regdate` VARCHAR(200) NOT NULL,
	`CpassReqDate` VARCHAR(200) NOT NULL,
	`voucher` VARCHAR(200) NOT NULL,
	`wallPaper` VARCHAR(45) NULL DEFAULT 'Desk',
	`theme` VARCHAR(45) NULL DEFAULT 'blue',
	`wpStretch` TINYINT(1) NULL DEFAULT NULL,
	`extrainfo1` VARCHAR(45) NULL DEFAULT NULL,
	`extrainfo2` VARCHAR(45) NULL DEFAULT NULL,
	`extrainfo3` VARCHAR(45) NULL DEFAULT NULL,
	`active` TINYINT(1) NULL DEFAULT NULL,
	PRIMARY KEY (`P_Id`),
	UNIQUE INDEX `id` (`P_Id`),
	UNIQUE INDEX `username` (`username`)
) ENGINE=InnoDB COLLATE='utf8_general_ci' AUTO_INCREMENT=2;


INSERT INTO `users` (`P_Id`, `username`, `password`, `email`, `regdate`, `CpassReqDate`, `voucher`, `wallPaper`, `theme`, `wpStretch`, `extrainfo1`, `extrainfo2`, `extrainfo3`, `active`) VALUES 
(1,
'set_admin_user',
'set_admin_pass',
'set_admin_email',
'1316496013','','','Blue','blue',1,'','','',1);




DROP TABLE IF EXISTS `user_groups`;
CREATE TABLE IF NOT EXISTS `user_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUser` int(11) DEFAULT NULL,
  `idGroup` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB COLLATE='utf8_general_ci' AUTO_INCREMENT=4;

INSERT INTO `user_groups` (`id`, `idUser`, `idGroup`) VALUES
(1,1,1),
(2,1,2),
(3,1,3);




DROP TABLE IF EXISTS `user_preferences`;
CREATE TABLE IF NOT EXISTS `user_preferences` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUser` int(11) DEFAULT NULL,
  `idModule` int(11) DEFAULT NULL,
  `shorcut` int(11) DEFAULT NULL,
  `qLaunch` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB COLLATE='utf8_general_ci' AUTO_INCREMENT=12;

INSERT INTO `user_preferences` (`id`, `idUser`, `idModule`, `shorcut`, `qLaunch`) VALUES 
(1,1,1,1,1),
(2,1,2,1,1),
(3,1,3,1,1),
(4,1,4,1,1),
(5,1,5,1,1),
(6,1,6,1,1),
(7,1,7,1,1),
(8,1,8,0,0),
(9,1,9,0,0),
(10,1,10,1,0),
(11,1,11,1,0),
(12,1,12,1,0);
