# ************************************************************
# Sequel Pro SQL dump
# Version 5446
#
# https://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 8.0.16)
# Database: EndWorldHunger
# Generation Time: 2019-10-27 12:46:30 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table FoodItem
# ------------------------------------------------------------

LOCK TABLES `FoodItem` WRITE;
/*!40000 ALTER TABLE `FoodItem` DISABLE KEYS */;

INSERT INTO `FoodItem` (`id`, `description`, `expiry`, `image`, `name`, `quantity`, `timePosted`, `providerId`, `foodItems`)
VALUES
	(1,'Vegetarian friendly!','2019-10-31 00:34:00','A picture of pepperonis on a grass','Hamesh\'s Vegetarian Pepperonis',10,'2019-10-28 07:00:51',1,NULL),
	(2,'Vegetarian friendly!','2019-10-31 00:34:00','A picture of pepperonis on a grass','Hamesh\'s Vegetarian Pepperonis',10,'2019-10-28 07:00:51',2,NULL),
	(3,'Vegetarian friendly!','2019-10-31 00:34:00','A picture of pepperonis on a grass','Hamesh\'s Vegetarian Pepperonis',10,'2019-10-28 07:00:51',4,NULL),
	(4,'Vegetarian friendly!','2019-10-31 00:34:00','A picture of pepperonis on a grass','Hamesh\'s Vegetarian Pepperonis',10,'2019-10-28 07:00:51',2,NULL),
	(5,'Vegetarian friendly!','2019-10-31 00:34:00','A picture of pepperonis on a grass','Hamesh\'s Vegetarian Pepperonis',10,'2019-10-28 07:00:51',1,NULL),
	(6,'Vegetarian friendly!','2019-10-31 00:34:00','A picture of pepperonis on a grass','Hamesh\'s Vegetarian Pepperonis',10,'2019-10-28 07:00:51',5,NULL),
	(7,'Vegetarian friendly!','2019-10-31 00:34:00','A picture of pepperonis on a grass','Hamesh\'s Vegetarian Pepperonis',10,'2019-10-28 07:00:51',6,NULL),
	(8,'Vegetarian friendly!','2019-10-31 00:34:00','A picture of pepperonis on a grass','Hamesh\'s Vegetarian Pepperonis',6,'2019-10-28 07:00:51',6,7),
	(9,'Vegetarian friendly!','2019-10-31 00:34:00','A picture of pepperonis on a grass','Hamesh\'s Vegetarian Pepperonis',9,'2019-10-28 07:00:51',6,8);

/*!40000 ALTER TABLE `FoodItem` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table FoodOrder
# ------------------------------------------------------------

LOCK TABLES `FoodOrder` WRITE;
/*!40000 ALTER TABLE `FoodOrder` DISABLE KEYS */;

INSERT INTO `FoodOrder` (`id`, `orderCode`, `orderStatus`, `orderTime`, `quantity`, `providerId`, `userId`)
VALUES
	(1,NULL,'Doing','2018-01-24 07:00:51',0,1,1),
	(2,NULL,'Doing','2018-01-24 07:00:51',0,1,1),
	(3,NULL,'Doing','2018-01-24 07:00:51',0,1,1),
	(4,NULL,'Doing','2018-01-24 07:00:51',1,1,1),
	(5,NULL,'Doing','2018-01-24 07:00:51',1,1,1),
	(6,NULL,'Doing','2018-01-24 07:00:51',1,1,1),
	(7,NULL,'Doing','2018-01-24 07:00:51',1,1,1),
	(8,NULL,'Doing','2018-01-24 07:00:51',1,1,1);

/*!40000 ALTER TABLE `FoodOrder` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Provider
# ------------------------------------------------------------

LOCK TABLES `Provider` WRITE;
/*!40000 ALTER TABLE `Provider` DISABLE KEYS */;

INSERT INTO `Provider` (`id`, `email`, `lastStreakUpload`, `latitude`, `location`, `longitude`, `password`, `phoneNumber`, `points`, `providerName`, `providerType`, `rating`, `status`, `streak`, `username`)
VALUES
	(1,'test@provider.com','2019-10-05',32.6439595,'123 Broadway, Chula Vista, CA 91910, USA',-117.0941868,'password1231','0457773471',503,'Alvin\'s Banana Snacks','Restaurant',3,'Active',1,'fn24iufiu24'),
	(2,'test@provider.com','2019-10-05',32.6439595,'123 Broadway, Chula Vista, CA 91910, USA',-117.0941868,'password134324','0467225364',35,'Alvin\'s Apple Snacks','Restaurant',4,'Active',4,'g43g43gg4g'),
	(3,'test@provider.com','2019-10-05',32.6439595,'123 Broadway, Chula Vista, CA 91910, USA',-117.0941868,'password14324','0467245364',335,'Alvin\'s Orange Snacks','Restaurant',2,'Active',1,'gwerrgreg'),
	(4,'test@provider.com','2019-10-05',-33.8928035,'401 Abercrombie St, Darlington NSW 2008, Australia',151.1903085,'password145454','0467267764',33,'Alvin\'s Chocy Snacks','Restaurant',3,'Active',5,'gregreg33g'),
	(5,'test@provider.com','2019-10-05',-33.8928035,'401 Abercrombie St, Darlington NSW 2008, Australia',151.1903085,'password123432','0467225385',555,'Alvin\'s Strawbee Snacks','Restaurant',3,'Active',2,'j7j76j67j67'),
	(6,'test@provider.com','2019-10-05',-33.8928035,'401 Abercrombie St, Darlington NSW 2008, Australia',151.1903085,'password154544','0467225366',33,'Alvin\'s Milk','Restaurant',1,'Active',6,'j7tjtyjtyjtyj'),
	(7,'test@provider.com','2019-10-05',35.9909152,'404 Abercrombie Rd, Wake Forest, NC 27587, USA',-78.5121375,'password145424','0467225364',3,'Alvin\'s Shop','Restaurant',5,'Active',3,'jytjtyb454g'),
	(8,'test@provider.com','2019-10-05',-33.8928035,'401 Abercrombie St, Darlington NSW 2008, Australia',151.1903085,'password155555','0467225343',333,'Alvin\'s Thai','Restaurant',2,'Active',5,'4g34g34g'),
	(9,'test@provider.com','2019-10-05',-33.8918296,'333 Abercrombie St, Darlington NSW 2008, Australia',151.1928967,'password1545455','0467225954',33,'Alvin\'s Yeeros','Restaurant',2,'Active',6,'geoigjr9g'),
	(10,'test@provider.com','2019-10-05',-33.8918296,'333 Abercrombie St, Darlington NSW 2008, Australia',151.1928967,'password1434343','0467225545',4224,'Alvin\'s Gyros','Restaurant',2,'Active',6,'fkr9k8f9r89'),
	(11,'test@provider.com','2019-10-05',40.72773249999999,'3 King St, New York, NY 10012, USA',-74.00276749999999,'password122233','0457225364',44,'Alvin\'s Chinese','Supermarket',3,'Active',6,'frjkgij393g'),
	(12,'test@provider.com','2019-10-05',43.7023075,'33 King St, York, ON M9N 1L1, Canada',-79.5189855,'password14343434','0467315364',43,'Alvin\'s Lebanese','Supermarket',4,'Active',4,'grjjr9gj893g'),
	(13,'test@provider.com','2019-10-05',32.7843487,'331 King St, Charleston, SC 29401, USA',-79.9354566,'password14343434','0400520000',999,'Alvin\'s Wholesaler','Supermarket',5,'Active',32,'alvinsshophehe');

/*!40000 ALTER TABLE `Provider` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table ProviderBan
# ------------------------------------------------------------



# Dump of table ProviderReport
# ------------------------------------------------------------



# Dump of table ProviderReview
# ------------------------------------------------------------

LOCK TABLES `ProviderReview` WRITE;
/*!40000 ALTER TABLE `ProviderReview` DISABLE KEYS */;

INSERT INTO `ProviderReview` (`id`, `comment`, `rating`, `userType`, `authorId`, `ownerId`)
VALUES
	(1,'fantastic',5,'Individual',1,1),
	(2,'excellent',5,'Individual',2,1),
	(3,'great',4,'Charity',3,1),
	(4,'bad',1,'Organisation',4,1);

/*!40000 ALTER TABLE `ProviderReview` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table User
# ------------------------------------------------------------

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;

INSERT INTO `User` (`id`, `consumerType`, `dailyLimit`, `email`, `name`, `password`, `phoneNumber`, `rating`, `status`, `username`)
VALUES
	(1,'Individual',19,'bob@hotmail.com','bob34325','5435345435','0400123456',-1,'Active','testuser'),
	(2,'Individual',4,'jacob@hotmail.com','jacob5325325','45435435543','0400123456',-1,'Active','testuser'),
	(3,'Charity',50,'alex@hotmail.com','akex54333','5435343545','0400123456',-1,'Active','testuser'),
	(4,'Organisation',50,'james@hotmail.com','james222222','5435435543','0400123456',-1,'Active','testuser'),
	(5,'Charity',50,'alvin@hotmail.com','alvin4333333','3454354355','0400123456',-1,'Active','testuser'),
	(6,'Charity',50,'rona@hotmail.com','rona444444','324324234','0400123456',-1,'Lock','testuser'),
	(7,'Charity',50,'jina@hotmail.com','jina555555','324234324234','0400123456',-1,'Lock','testuser'),
	(8,'Individual',4,'hamesh@hotmail.com','hamesh33312','123324324234','0400123456',-1,'Active','testuser'),
	(9,'Individual',4,'rob@hotmail.com','rob4342423','436436346','0400123456',-1,'Active','testuser'),
	(10,'Individual',4,'jack@hotmail.com','jack434234234','32423663','0400123456',-1,'Active','testuser'),
	(11,'Organisation',50,'natalie@hotmail.com','natalie434324234','6436436436','0400123456',-1,'Active','testuser'),
	(12,'Organisation',50,'jimmy@hotmail.com','jimmy4343434','4636436436','0400123456',-1,'Active','testuser'),
	(13,'Organisation',50,'chris@hotmail.com','chris43434343','346436436346','0400123456',-1,'Active','testuser');

/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table UserBan
# ------------------------------------------------------------



# Dump of table UserLogs
# ------------------------------------------------------------

LOCK TABLES `UserLogs` WRITE;
/*!40000 ALTER TABLE `UserLogs` DISABLE KEYS */;

INSERT INTO `UserLogs` (`id`, `activity`, `logTime`, `providerId`, `userId`)
VALUES
	(1,'stuff',NULL,1,1),
	(2,'things',NULL,1,2),
	(3,'wahoo',NULL,1,3),
	(4,'test',NULL,1,4);

/*!40000 ALTER TABLE `UserLogs` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table UserReport
# ------------------------------------------------------------



# Dump of table UserReview
# ------------------------------------------------------------

LOCK TABLES `UserReview` WRITE;
/*!40000 ALTER TABLE `UserReview` DISABLE KEYS */;

INSERT INTO `UserReview` (`id`, `comment`, `rating`, `userType`, `authorId`, `ownerId`)
VALUES
	(1,'good',4,'Restaurant',1,1),
	(2,'ok',3,'Restaurant',1,1),
	(3,'great',5,'Restaurant',1,2),
	(4,'bad',1,'Supermarket',1,2);

/*!40000 ALTER TABLE `UserReview` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
