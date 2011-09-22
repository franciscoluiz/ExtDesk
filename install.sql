CREATE DATABASE extdesk;

use extdesk;

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
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `extdesk`.`users`
(`username`,`password`,`email`,`regdate`,`CpassReqDate`,`voucher`,
`wallPaper`,`wpStretch`,`extrainfo1`,`extrainfo2`,`extrainfo3`,`active`)
VALUES
('xcape','0944024e99eae16d3a062e03c745bae4b03a1a4c','xcape@extdesk.net','1316496013','','','Blue',1,'','','',1);

INSERT INTO `extdesk`.`users`
(`username`,`password`,`email`,`regdate`,`CpassReqDate`,`voucher`,
`wallPaper`,`wpStretch`,`extrainfo1`,`extrainfo2`,`extrainfo3`,`active`)
VALUES
('francisco','0944024e99eae16d3a062e03c745bae4b03a1a4c','francisco@extdesk.net','1316495884','','','Desktop',1,'','','',1);