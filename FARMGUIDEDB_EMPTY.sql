CREATE DATABASE  IF NOT EXISTS `farmguidedb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `farmguidedb`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: farmguidedb
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `cartid` int NOT NULL AUTO_INCREMENT,
  `pfid` int NOT NULL,
  `quantity` int NOT NULL,
  `wid` int NOT NULL,
  PRIMARY KEY (`cartid`),
  KEY `pfid_idx` (`pfid`),
  KEY `wid_idx` (`wid`),
  CONSTRAINT `pfid` FOREIGN KEY (`pfid`) REFERENCES `product_farmer` (`pfid`),
  CONSTRAINT `wid` FOREIGN KEY (`wid`) REFERENCES `wholesaler` (`wid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities` (
  `cityid` int NOT NULL AUTO_INCREMENT,
  `cityname` varchar(45) NOT NULL,
  PRIMARY KEY (`cityid`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES (1,'Pune'),(2,'Mumbai'),(3,'Delhi'),(4,'Ahmedabad'),(5,'Patna'),(6,'Varanasi'),(7,'Kolkata'),(8,'Chennai'),(9,'Chandigadh');
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `farmer`
--

DROP TABLE IF EXISTS `farmer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `farmer` (
  `fid` int NOT NULL AUTO_INCREMENT,
  `fname` varchar(45) NOT NULL,
  `lname` varchar(45) NOT NULL,
  `aadhar_no` int NOT NULL,
  `address` varchar(45) NOT NULL,
  `cityid` int NOT NULL,
  `uid` int NOT NULL,
  `email` varchar(45) NOT NULL,
  `mobile_no` int NOT NULL,
  PRIMARY KEY (`fid`),
  UNIQUE KEY `mobile_no_UNIQUE` (`mobile_no`),
  UNIQUE KEY `aadhar_no_UNIQUE` (`aadhar_no`),
  KEY `uid_idx` (`uid`),
  KEY `cityid_idx` (`cityid`),
  CONSTRAINT `cityid_f` FOREIGN KEY (`cityid`) REFERENCES `cities` (`cityid`),
  CONSTRAINT `uid_f` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `farmer`
--

LOCK TABLES `farmer` WRITE;
/*!40000 ALTER TABLE `farmer` DISABLE KEYS */;
/*!40000 ALTER TABLE `farmer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `oid` int NOT NULL AUTO_INCREMENT,
  `cartid` int NOT NULL,
  `datetime` datetime NOT NULL,
  `amount` float NOT NULL,
  PRIMARY KEY (`oid`),
  KEY `cartid_idx` (`cartid`),
  CONSTRAINT `cartid` FOREIGN KEY (`cartid`) REFERENCES `cart` (`cartid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_details` (
  `odetailid` int NOT NULL AUTO_INCREMENT,
  `pfid` int NOT NULL,
  `amount` float NOT NULL,
  `quantity` int NOT NULL,
  `oid` int NOT NULL,
  PRIMARY KEY (`odetailid`),
  KEY `pfid_od_idx` (`pfid`),
  KEY `oid_idx` (`oid`),
  CONSTRAINT `oid` FOREIGN KEY (`oid`) REFERENCES `order` (`oid`),
  CONSTRAINT `pfid_od` FOREIGN KEY (`pfid`) REFERENCES `product_farmer` (`pfid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `payid` int NOT NULL AUTO_INCREMENT,
  `paydate` datetime NOT NULL,
  `paytype` varchar(45) NOT NULL,
  `amount` float NOT NULL,
  `transaction_id` int NOT NULL,
  `oid` int NOT NULL,
  `wid` int NOT NULL,
  PRIMARY KEY (`payid`),
  UNIQUE KEY `transaction_id_UNIQUE` (`transaction_id`),
  KEY `oid_p_idx` (`oid`),
  KEY `wid_p_idx` (`wid`),
  CONSTRAINT `oid_p` FOREIGN KEY (`oid`) REFERENCES `order` (`oid`),
  CONSTRAINT `wid_p` FOREIGN KEY (`wid`) REFERENCES `wholesaler` (`wid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `pid` int NOT NULL AUTO_INCREMENT,
  `pname` varchar(45) NOT NULL,
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_farmer`
--

DROP TABLE IF EXISTS `product_farmer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_farmer` (
  `pfid` int NOT NULL AUTO_INCREMENT,
  `fid` int NOT NULL,
  `spid` int DEFAULT NULL,
  `price` float NOT NULL,
  `pid` int NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`pfid`),
  KEY `fid_idx` (`fid`),
  KEY `spid_idx` (`spid`),
  KEY `pid_pf_idx` (`pid`),
  CONSTRAINT `fid` FOREIGN KEY (`fid`) REFERENCES `farmer` (`fid`),
  CONSTRAINT `pid_pf` FOREIGN KEY (`pid`) REFERENCES `product` (`pid`),
  CONSTRAINT `spid` FOREIGN KEY (`spid`) REFERENCES `subproduct` (`spid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_farmer`
--

LOCK TABLES `product_farmer` WRITE;
/*!40000 ALTER TABLE `product_farmer` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_farmer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `rid` int NOT NULL AUTO_INCREMENT,
  `rname` varchar(45) NOT NULL,
  PRIMARY KEY (`rid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Farmer'),(2,'Wholesaler');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subproduct`
--

DROP TABLE IF EXISTS `subproduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subproduct` (
  `spid` int NOT NULL AUTO_INCREMENT,
  `spname` varchar(45) NOT NULL,
  `pid` int NOT NULL,
  PRIMARY KEY (`spid`),
  KEY `pid_idx` (`pid`),
  CONSTRAINT `pid` FOREIGN KEY (`pid`) REFERENCES `product` (`pid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subproduct`
--

LOCK TABLES `subproduct` WRITE;
/*!40000 ALTER TABLE `subproduct` DISABLE KEYS */;
/*!40000 ALTER TABLE `subproduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `pwd` varchar(45) NOT NULL,
  `rid` int NOT NULL,
  `status` tinyint NOT NULL,
  PRIMARY KEY (`uid`),
  KEY `rid_idx` (`rid`),
  CONSTRAINT `rid` FOREIGN KEY (`rid`) REFERENCES `roles` (`rid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wholesaler`
--

DROP TABLE IF EXISTS `wholesaler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wholesaler` (
  `wid` int NOT NULL AUTO_INCREMENT,
  `fname` varchar(45) NOT NULL,
  `lname` varchar(45) NOT NULL,
  `address` varchar(45) NOT NULL,
  `cityid` int NOT NULL,
  `gst_no` varchar(45) NOT NULL,
  `uid` int NOT NULL,
  `email` varchar(45) NOT NULL,
  `mobile_no` int NOT NULL,
  PRIMARY KEY (`wid`),
  UNIQUE KEY `mobile_no_UNIQUE` (`mobile_no`),
  KEY `uid_idx` (`uid`),
  KEY `cityid_idx` (`cityid`),
  CONSTRAINT `cityid_w` FOREIGN KEY (`cityid`) REFERENCES `cities` (`cityid`),
  CONSTRAINT `uid_w` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wholesaler`
--

LOCK TABLES `wholesaler` WRITE;
/*!40000 ALTER TABLE `wholesaler` DISABLE KEYS */;
/*!40000 ALTER TABLE `wholesaler` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-01 12:14:12
