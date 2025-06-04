-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 30, 2025 at 07:53 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `SUST_Karate_Club`
--

-- --------------------------------------------------------

--
-- Table structure for table `about_club`
--

CREATE TABLE `about_club` (
  `id` int(11) NOT NULL,
  `section` varchar(50) DEFAULT NULL,
  `content` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `about_club`
--

INSERT INTO `about_club` (`id`, `section`, `content`) VALUES
(1, 'about', 'SUST Karate Club is one of the most active clubs at Daffodil\n                International University. Launched in July 2019 to ensure the\n                safety of the students, especially girls, the club has already\n                won Gold, Silver, and Bronze multiple times for Daffodil\n                International University by participating in national-level\n                karate competitions.'),
(2, 'mission', 'We are working on the theme \"Learn karate, be confident &\n                protect yourself\". The main goal of the Karate-Do Club is to\n                provide self-defense training to Daffodil students. Winning\n                national and international competitions and spreading the\n                reputation of Daffodil International University in the field of\n                karate.'),
(3, 'vision', 'We want our university\'s reputation to spread in the karate\n                arena and to emerge as a strong competitor in the competition.\n                Besides, let the students of our university stay safe at all\n                times by learning self-defense.');

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

CREATE TABLE `announcements` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `attachmentUrl` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `announcements`
--

INSERT INTO `announcements` (`id`, `title`, `content`, `createdAt`, `attachmentUrl`) VALUES
(1, 'National Karate Championship 2025!', 'Registration Open! Registration is open on 5th june at 3 to 5 pm! get ready!', '2025-05-28 17:52:48', 'https://res.cloudinary.com/dcaqeechf/image/upload/v1748454767/announcements/xykhs2gajjrt7hlldgnq.jpg'),
(2, 'National Karate Championship 2025!', 'Registration Open! Registration is open on 5th june at 3 to 5 pm! get ready!', '2025-05-28 17:52:50', 'https://res.cloudinary.com/dcaqeechf/image/upload/v1748454769/announcements/zl48e4vif24w5dx9afe0.jpg'),
(3, 'National Karate Championship 2025!', 'Registration Open! Registration is open on 5th june at 3 to 5 pm! get ready!', '2025-05-28 17:52:50', 'https://res.cloudinary.com/dcaqeechf/image/upload/v1748454769/announcements/tnnpogirdkw9yiyufuc1.jpg'),
(5, 'Registration Open!', 'at 3 june, 2025', '2025-05-28 17:55:07', NULL),
(6, 'hi', 'hi', '2025-05-28 18:52:11', 'https://res.cloudinary.com/dcaqeechf/image/upload/v1748458330/announcements/sql0jmps2wpggs8gwvfz.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `bills`
--

CREATE TABLE `bills` (
  `id` int(11) NOT NULL,
  `transaction_id` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bills`
--

INSERT INTO `bills` (`id`, `transaction_id`, `name`, `email`, `status`, `amount`) VALUES
(1, 'TRANS_1742553413231', 'Tasnim Sayeb', 'tasnimsayeb@gmail.com', 'paid', 1000.00),
(2, 'TRANS_1742571694285', 'Fariha Nusrat', 'nusrat@gmail.com', 'paid', 1000.00),
(3, 'TRANS_1742573398445', 'Samim ', 'samim@gmail.com', 'paid', 1500.00),
(4, 'TRANS_1746972035387', 'Tafriya', 'habiba@gmail.com', 'paid', 1000.00),
(5, 'TRANS_1746975588278', 'ifrit', 'ifrit@gmail.com', 'paid', 1000.00);

-- --------------------------------------------------------

--
-- Table structure for table `exams`
--

CREATE TABLE `exams` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `belt` varchar(50) NOT NULL,
  `examiner` varchar(100) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `exams`
--

INSERT INTO `exams` (`id`, `date`, `time`, `belt`, `examiner`, `location`) VALUES
(1, '2025-10-23', '15:00:00', 'Yellow Belt', 'Aradhon Sir', 'Auditorium');

-- --------------------------------------------------------

--
-- Table structure for table `exam_routine`
--

CREATE TABLE `exam_routine` (
  `id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  `belt` varchar(50) DEFAULT NULL,
  `examiner` varchar(100) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `instructors`
--

CREATE TABLE `instructors` (
  `id` int(11) NOT NULL,
  `profilePic` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `position` enum('Chief Instructor','In-charge Instructor') NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `belt` varchar(100) DEFAULT NULL,
  `studyBackground` text DEFAULT NULL,
  `achievements` text DEFAULT NULL,
  `servingPeriod` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `role` enum('student','instructor','admin') DEFAULT 'instructor',
  `password` varchar(255) NOT NULL DEFAULT 'changeme'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `instructors`
--

INSERT INTO `instructors` (`id`, `profilePic`, `name`, `position`, `email`, `phone`, `belt`, `studyBackground`, `achievements`, `servingPeriod`, `createdAt`, `updatedAt`, `role`, `password`) VALUES
(1, 'https://res.cloudinary.com/dcaqeechf/image/upload/v1748360054/instructors/cvl2trtrx75mfl5yspvc.jpg', 'Ashraful Islam', 'Chief Instructor', 'ashrafulislam@gmail.com', '01712345678', 'Black Belt', 'Master’s in Martial Arts', 'Won National Karate Championship 2021, Trained 50+ students', '2008 - Present', '2025-03-21 17:36:00', '2025-05-27 15:34:29', 'instructor', '$2b$10$M9fy95jaM1LJjznun6wRXOlLkM2ZjiN6ciyQtq3ERRQHp2A8AdTLm'),
(2, 'https://res.cloudinary.com/dcaqeechf/image/upload/v1742578249/instructors/fqfaq4abau6pjbo1r8qd.jpg', 'Aradhon Talukder', 'In-charge Instructor', 'aradhontalukder@gmail.com', '01787654321', 'Black Belt', 'Bachelor’s in Physical Education', 'National Karate Referee, Specializing in Kids Training', '2015 - Present', '2025-03-21 17:36:00', '2025-03-21 17:36:00', 'instructor', 'changeme');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `studentId` int(11) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `type` enum('belt','payment','announcement') DEFAULT 'announcement',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `studentId`, `message`, `type`, `createdAt`) VALUES
(6, 16, 'Blue belt exam rescheduled to 10th June, 2025.', 'announcement', '2025-05-28 16:22:22'),
(7, 12, 'Blue belt exam rescheduled to 10th June, 2025.', 'announcement', '2025-05-28 16:22:22'),
(8, 17, 'hi', 'belt', '2025-05-28 18:40:43'),
(9, 17, 'hello!', 'announcement', '2025-05-28 18:51:38'),
(12, 10, 'hello', 'announcement', '2025-05-28 18:51:38'),
(13, 11, 'hello', 'announcement', '2025-05-28 18:51:38'),
(14, 16, 'hello', 'announcement', '2025-05-28 18:51:38'),
(15, 12, 'hello', 'announcement', '2025-05-28 18:51:38'),
(16, 17, 'Your belt has been updated to Yellow Belt.', 'belt', '2025-05-28 19:28:55');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `guardian` varchar(255) DEFAULT NULL,
  `relation` varchar(50) DEFAULT NULL,
  `dateOfBirth` date DEFAULT NULL,
  `studentID` varchar(50) NOT NULL,
  `campus` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `gender` enum('Male','Female','Other') DEFAULT NULL,
  `bloodGroup` enum('A+','A-','B+','B-','O+','O-','AB+','AB-') DEFAULT NULL,
  `height` decimal(5,2) DEFAULT NULL,
  `weight` decimal(5,2) DEFAULT NULL,
  `currentAddress` text DEFAULT NULL,
  `permanentAddress` text DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `nationalID` varchar(50) DEFAULT NULL,
  `religion` varchar(50) DEFAULT NULL,
  `previousExperience` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `imageUrl` varchar(255) DEFAULT NULL,
  `role` enum('student','instructor','admin') DEFAULT 'student',
  `certificate` varchar(2083) DEFAULT NULL,
  `belt` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `name`, `guardian`, `relation`, `dateOfBirth`, `studentID`, `campus`, `department`, `gender`, `bloodGroup`, `height`, `weight`, `currentAddress`, `permanentAddress`, `phone`, `password`, `email`, `nationalID`, `religion`, `previousExperience`, `createdAt`, `updatedAt`, `imageUrl`, `role`, `certificate`, `belt`) VALUES
(10, 'Shakera Jannat Ema', 'Shafique', 'Father', '2001-10-10', '2020831055', 'SUST', 'SWE', 'Female', 'B+', 5.00, 70.00, 'SUST, SYLHET, BANGLADESH', 'Sunamganj', '01854088947', 'ema123', 'ema@gmail.com', '7348454359', 'Islam', 'none', '2025-03-20 21:33:40', '2025-05-27 17:03:36', NULL, 'student', 'https://res.cloudinary.com/dcaqeechf/image/upload/v1748365346/certificates/tobbvrdpblzlk6teejx9.png', 'Brown Belt'),
(11, 'Mehrab Hossain Shakib', 'Mohiuddin', 'Father', '2002-12-09', '12108028', 'Outside', 'CSE', 'Male', 'O+', 5.00, 70.00, 'SUST, SYLHET, BANGLADESH', 'Sunamganj', '01854088948', '234308', 'example@gmail.com', '7348454358', 'Islam', 'Emnei', '2025-03-21 09:40:18', '2025-03-21 09:40:18', 'https://res.cloudinary.com/dcaqeechf/image/upload/v1742550018/tjvt4yxgudaghjohl0ml.png', 'student', NULL, NULL),
(12, 'Tasnim Sayeb', 'Mohiuddin', 'Father', '2010-09-25', '123456', 'SUST-School', 'PRI', 'Male', 'O+', 4.00, 45.00, 'Bakolia ', 'Chittagong', '01878909306', '123456', 'tasnimsayeb@gmail.com', '654321', 'Islam', 'Currently Noob', '2025-03-21 10:30:36', '2025-03-21 10:30:36', 'https://res.cloudinary.com/dcaqeechf/image/upload/v1742553035/c8jnlb90ldbmmiyuf6mt.jpg', 'student', NULL, NULL),
(14, 'Fariha Nusrat', 'Shafique', 'Father', '2001-10-20', '2020831090', 'SUST', 'PME', 'Female', 'B+', 5.00, 57.00, 'Uposohor,  Block: D,  Road  Number: 32', 'Sunamganj', '01312043692', 'nusu123', 'nusrat@gmail.com', '7348454459', 'Islam', 'none', '2025-03-21 15:41:08', '2025-03-21 15:41:08', 'https://res.cloudinary.com/dcaqeechf/image/upload/v1742571668/o8308appzb0pb0r5eiur.jpg', 'student', NULL, NULL),
(15, 'Samim ', 'Mohiuddin ', 'Father', '2002-03-19', '456789', 'Outside', 'PRI', 'Male', 'O+', 5.00, 70.00, 'Uposohor,  Block: D,  Road  Number: 32', 'Chittagong', '0131204378', '789456', 'samim@gmail.com', '987654', 'Islam', 'Samim er exp nai', '2025-03-21 16:09:36', '2025-03-21 16:09:36', 'https://res.cloudinary.com/dcaqeechf/image/upload/v1742573375/vajpxvsn3jifzywl6nb3.jpg', 'student', NULL, NULL),
(16, 'Tafriya', 'Habiba', 'Self', '2001-12-09', '2020831031', 'SUST', 'SWE', 'Female', 'O+', 5.00, 50.00, 'SUST, SYLHET, BANGLADESH', 'Dhaka', '01854088990', '$2b$10$UoB8GNCMtcP6tIW4usZgeutwkmd9HQSYmiWOdq5r3tOFpY4eZi/c.', 'habiba@gmail.com', '7348454323', 'Islam', 'none', '2025-05-11 14:00:21', '2025-05-11 14:00:21', 'https://res.cloudinary.com/dcaqeechf/image/upload/v1746972020/vyzmratzpxgqeg73hhnr.png', 'student', NULL, NULL),
(17, 'ifrit', 'ifrit', 'Self', '2202-02-02', '56346537', 'SUST', 'gdw', 'Female', 'B+', 5.00, 70.00, 'Uposohor,  Block: D,  Road  Number: 32', 'Sylhet', '01312043645', '$2b$10$OKKpS97AZTg2FG5n0yY15ebaMn9Om3n34RVuhpFziKtUvDSLunxqG', 'ifrit@gmail.com', '10987645', 'Islam', 'none', '2025-05-11 14:59:35', '2025-05-28 19:28:55', 'https://res.cloudinary.com/dcaqeechf/image/upload/v1746975575/zjqtl8sebl3gjg8zsiia.jpg', 'student', 'https://res.cloudinary.com/dcaqeechf/image/upload/v1748460533/certificates/ovp0h8oinecmwdyzzep2.png', 'Yellow Belt');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `about_club`
--
ALTER TABLE `about_club`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bills`
--
ALTER TABLE `bills`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `transaction_id` (`transaction_id`);

--
-- Indexes for table `exams`
--
ALTER TABLE `exams`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `exam_routine`
--
ALTER TABLE `exam_routine`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `instructors`
--
ALTER TABLE `instructors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `studentID` (`studentID`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD UNIQUE KEY `nationalID` (`nationalID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `about_club`
--
ALTER TABLE `about_club`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `announcements`
--
ALTER TABLE `announcements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `bills`
--
ALTER TABLE `bills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `exams`
--
ALTER TABLE `exams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `exam_routine`
--
ALTER TABLE `exam_routine`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `instructors`
--
ALTER TABLE `instructors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
