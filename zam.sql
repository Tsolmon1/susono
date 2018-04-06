-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 29, 2017 at 02:44 AM
-- Server version: 10.1.8-MariaDB
-- PHP Version: 5.6.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `zam`
--

-- --------------------------------------------------------

--
-- Table structure for table `companys`
--

CREATE TABLE `companys` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `register` varchar(250) NOT NULL,
  `rank` enum('Маш сайн','Сайн','Дунд','Муу') NOT NULL DEFAULT 'Сайн',
  `ready_type` enum('Бэлэн','Бэлэн бус','Удахгүй') NOT NULL DEFAULT 'Бэлэн',
  `phone` varchar(50) NOT NULL,
  `email` varchar(250) NOT NULL,
  `address` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `companys`
--

INSERT INTO `companys` (`id`, `name`, `register`, `rank`, `ready_type`, `phone`, `email`, `address`) VALUES
(1, 'Susano', '95052932', 'Сайн', 'Бэлэн', '88660547', 'cafs.bbsb@gmail.com', 'asdgah asd ag');

-- --------------------------------------------------------

--
-- Table structure for table `company_equipments`
--

CREATE TABLE `company_equipments` (
  `id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `equipment_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `company_equipments`
--

INSERT INTO `company_equipments` (`id`, `company_id`, `equipment_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(15, 1, 16);

-- --------------------------------------------------------

--
-- Table structure for table `equipments`
--

CREATE TABLE `equipments` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `image` varchar(250) NOT NULL,
  `power` varchar(250) NOT NULL,
  `e_desc` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `equipments`
--

INSERT INTO `equipments` (`id`, `name`, `image`, `power`, `e_desc`) VALUES
(1, 'Машин-1', '1_1_20170124.jpg', 'Сайн', 'Зам тэгшлэх машин'),
(2, 'Ачааны машин', '1_1_20170124.jpg', '355051062179548', 'Замд ашиглах ачааны машин'),
(16, 'test', 'park.png', '352191070847539', 'asdhah adsf af');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `company_id` int(11) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `location` varchar(250) NOT NULL,
  `groups` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`id`, `name`, `company_id`, `start_date`, `end_date`, `location`, `groups`) VALUES
(1, 'Замын ажил - 1', 1, '2017-04-01 00:00:00', '2017-04-30 00:00:00', 'Цагаан нуур хүрэх зам', 3),
(2, 'Замын ажил - 2', 1, '2017-04-01 00:00:00', '2017-04-30 00:00:00', '50км зам', 2),
(8, 'test', 1, '2017-05-05 00:00:00', '2017-05-31 00:00:00', 'test', 5),
(13, 'test1', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'sdafa asdfaasdf', 3);

-- --------------------------------------------------------

--
-- Table structure for table `jobs_images`
--

CREATE TABLE `jobs_images` (
  `id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `sub_job_id` int(11) NOT NULL,
  `path_id` int(11) NOT NULL,
  `path_type_id` int(11) NOT NULL,
  `image_date` datetime NOT NULL,
  `image` varchar(250) NOT NULL,
  `image_desc` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `jobs_images`
--

INSERT INTO `jobs_images` (`id`, `job_id`, `sub_job_id`, `path_id`, `path_type_id`, `image_date`, `image`, `image_desc`) VALUES
(1, 1, 1, 1, 1, '2017-04-25 00:00:00', '1_1_20170124.jpg', 'Мэдкү тайлбар л юм шиг байна. Test'),
(2, 1, 1, 1, 3, '2017-05-26 10:32:26', '1_2_20170124.jpg', 'tiime'),
(5, 8, 9, 7, 5, '2017-05-17 15:08:27', '1495001304724OI000001.jpg', 'testee'),
(7, 8, 9, 12, 6, '2017-05-19 09:50:35', '1495155030745OI000001.jpg', 'test'),
(14, 8, 9, 12, 3, '2017-05-26 10:37:54', '1495762667620OI000001.jpg', 'tiime');

-- --------------------------------------------------------

--
-- Table structure for table `notifs`
--

CREATE TABLE `notifs` (
  `id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `msg` varchar(250) NOT NULL,
  `ndate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `paths`
--

CREATE TABLE `paths` (
  `id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `sub_job_id` int(11) NOT NULL,
  `lat` varchar(50) NOT NULL,
  `lon` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `paths`
--

INSERT INTO `paths` (`id`, `job_id`, `sub_job_id`, `lat`, `lon`) VALUES
(1, 1, 1, '104.75827374', '50.23442,792'),
(2, 1, 1, '104.75822901', '50.23447294,788'),
(6, 8, 9, '105.50514221191406', '50.10701068658692'),
(7, 8, 9, '105.56419372558594', '50.10789144658702'),
(8, 8, 9, '105.62049865722656', '50.10789144658702'),
(9, 8, 9, '105.66719055175781', '50.104368309404165'),
(10, 8, 9, '105.71937561035156', '50.105249117995584'),
(11, 8, 9, '105.77705383300781', '50.10612991038979'),
(12, 8, 9, '105.80589294433594', '50.10789144658702'),
(28, 13, 18, '105.53672790527344', '50.10701068658692'),
(29, 13, 18, '105.57106018066406', '50.10789144658702'),
(30, 13, 18, '105.60539245605469', '50.10877219039021'),
(31, 13, 18, '105.63697814941406', '50.10877219039021'),
(32, 13, 19, '105.63697814941406', '50.10877219039021'),
(33, 13, 19, '105.66169738769531', '50.10789144658702'),
(34, 13, 19, '105.70289611816406', '50.10877219039021'),
(35, 13, 19, '105.74409484863281', '50.10789144658702'),
(36, 13, 19, '105.77430725097656', '50.10701068658692'),
(37, 13, 19, '105.80039978027344', '50.10789144658702');

-- --------------------------------------------------------

--
-- Table structure for table `path_types`
--

CREATE TABLE `path_types` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `color` varchar(250) NOT NULL,
  `color_code` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `path_types`
--

INSERT INTO `path_types` (`id`, `name`, `color`, `color_code`) VALUES
(1, 'Шороон далан', 'u-bg-brown-lighter', '#ab8172'),
(2, 'Дэд суурь', 'u-bg-brown', '#795548'),
(3, 'Далангийн дээд', 'u-bg-brown-darker', '#3f2d26'),
(4, 'Суурь', 'u-bg-brand-light', '#3c556e'),
(5, 'Асфальт', 'u-bg-brand-dark', '#1c2732'),
(6, 'Шингэн цацлага', 'u-bg-green-dark', '#3e8f41');

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`) VALUES
(1, 'Super Admin'),
(2, 'Admin'),
(3, 'Хэрэглэгч'),
(4, 'Менежер');

-- --------------------------------------------------------

--
-- Table structure for table `sub_jobs`
--

CREATE TABLE `sub_jobs` (
  `id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sub_jobs`
--

INSERT INTO `sub_jobs` (`id`, `job_id`, `name`, `start_date`, `end_date`) VALUES
(1, 1, '1-р хэсэг', '2017-04-01 00:00:00', '2017-04-30 00:00:00'),
(2, 1, '2-р хэсэг', '2017-04-07 00:00:00', '2017-04-30 00:00:00'),
(3, 1, '3-р хэсэг', '2017-04-27 00:00:00', '2017-04-29 00:00:00'),
(9, 8, '1-р хэсэг', '2017-05-05 00:00:00', '2017-05-31 00:00:00'),
(18, 13, '1-р хэсэг', '2017-05-04 00:00:00', '2017-05-31 00:00:00'),
(19, 13, '2-р хэсэг', '2017-05-04 00:00:00', '2017-05-31 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `sub_job_plans`
--

CREATE TABLE `sub_job_plans` (
  `id` int(11) NOT NULL,
  `sub_job_id` int(11) NOT NULL,
  `path_id` int(11) NOT NULL,
  `path_type_id` int(11) NOT NULL,
  `percent` int(11) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sub_job_plans`
--

INSERT INTO `sub_job_plans` (`id`, `sub_job_id`, `path_id`, `path_type_id`, `percent`, `start_date`, `end_date`) VALUES
(1, 1, 1, 1, 0, '2017-04-01 00:00:00', '2017-04-30 00:00:00'),
(2, 1, 1, 2, 10, '2017-04-07 00:00:00', '2017-04-28 00:00:00'),
(3, 1, 1, 3, 15, '2017-04-06 00:00:00', '2017-04-26 00:00:00'),
(4, 1, 1, 4, 20, '2017-04-04 00:00:00', '2017-04-26 00:00:00'),
(5, 1, 1, 5, 25, '2017-04-08 00:00:00', '2017-04-30 00:00:00'),
(6, 1, 1, 6, 30, '2017-04-13 00:00:00', '2017-04-29 00:00:00'),
(7, 9, 7, 5, 16, '2017-05-05 00:00:00', '2017-05-31 00:00:00'),
(9, 9, 12, 6, 16, '2017-05-05 00:00:00', '2017-05-31 00:00:00'),
(13, 9, 12, 3, 16, '2017-05-05 00:00:00', '2017-05-31 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `sub_job_ratings`
--

CREATE TABLE `sub_job_ratings` (
  `id` int(11) NOT NULL,
  `sub_job_plan_id` int(11) NOT NULL,
  `rate` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sub_job_ratings`
--

INSERT INTO `sub_job_ratings` (`id`, `sub_job_plan_id`, `rate`) VALUES
(1, 1, 10),
(2, 2, 10);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(250) NOT NULL,
  `company_id` int(11) NOT NULL,
  `email` varchar(250) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `company_id`, `email`, `phone`, `permission_id`) VALUES
(1, 'admin', 'YWRtaW4=', 1, 'info@susano-tech.com', '', 1),
(2, 'test', 'dGVzdDE=', 1, '', '', 3);

-- --------------------------------------------------------

--
-- Table structure for table `users_jobs`
--

CREATE TABLE `users_jobs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users_jobs`
--

INSERT INTO `users_jobs` (`id`, `user_id`, `job_id`, `company_id`) VALUES
(1, 1, 1, 1),
(2, 2, 8, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `companys`
--
ALTER TABLE `companys`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `company_equipments`
--
ALTER TABLE `company_equipments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `equipments`
--
ALTER TABLE `equipments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs_images`
--
ALTER TABLE `jobs_images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifs`
--
ALTER TABLE `notifs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `paths`
--
ALTER TABLE `paths`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `path_types`
--
ALTER TABLE `path_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sub_jobs`
--
ALTER TABLE `sub_jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sub_job_plans`
--
ALTER TABLE `sub_job_plans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sub_job_ratings`
--
ALTER TABLE `sub_job_ratings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_jobs`
--
ALTER TABLE `users_jobs`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `companys`
--
ALTER TABLE `companys`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `company_equipments`
--
ALTER TABLE `company_equipments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `equipments`
--
ALTER TABLE `equipments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `jobs_images`
--
ALTER TABLE `jobs_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `notifs`
--
ALTER TABLE `notifs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `paths`
--
ALTER TABLE `paths`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
--
-- AUTO_INCREMENT for table `path_types`
--
ALTER TABLE `path_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `sub_jobs`
--
ALTER TABLE `sub_jobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `sub_job_plans`
--
ALTER TABLE `sub_job_plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `sub_job_ratings`
--
ALTER TABLE `sub_job_ratings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `users_jobs`
--
ALTER TABLE `users_jobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
