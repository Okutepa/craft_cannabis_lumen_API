-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Apr 14, 2025 at 07:03 PM
-- Server version: 8.0.35
-- PHP Version: 8.2.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: craft_cannabis
--

-- --------------------------------------------------------

--
-- Table structure for table media
--

CREATE TABLE media (
  id bigint UNSIGNED NOT NULL,
  product_id bigint UNSIGNED NOT NULL,
  file_path varchar(255) NOT NULL,
  file_type varchar(100) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table media
--

INSERT INTO media (id, product_id, file_path, file_type, created_at, updated_at) VALUES
(1, 1, 'images/sativa_topaz_preroll.jpeg', 'image/jpeg', NULL, NULL),
(2, 2, 'images/hybrid_jade_flowers.png', 'image/png', NULL, NULL),
(29, 5, '/images/northern_haze_bud.jpg', 'image/jpeg', '2025-03-30 20:08:27', '2025-03-30 20:08:27'),
(30, 6, '/images/midnight_kush_closeup.png', 'image/png', '2025-03-30 20:08:27', '2025-03-30 20:08:27'),
(31, 7, '/images/golden_hybrid_packaging.jpg', 'image/jpeg', '2025-03-30 20:08:27', '2025-03-30 20:08:27'),
(32, 8, '/images/sour_skunk_preroll_shot.jpg', 'image/jpeg', '2025-03-30 20:08:27', '2025-03-30 20:08:27'),
(33, 9, '/images/lavender_dream_flower.jpg', 'image/jpeg', '2025-03-30 20:08:27', '2025-03-30 20:08:27'),
(34, 10, '/images/citrus_burst_flower.jpg', 'image/jpeg', '2025-03-30 20:08:27', '2025-03-30 20:08:27'),
(35, 10, '/images/citrus_burst_packaging.jpg', 'image/jpeg', '2025-03-30 20:08:27', '2025-03-30 20:08:27'),
(36, 11, '/images/stone_temple_bud.jpg', 'image/jpeg', '2025-03-30 20:08:27', '2025-03-30 20:08:27'),
(37, 12, '/images/hazy_horizon_closeup.jpg', 'image/jpeg', '2025-03-30 20:08:27', '2025-03-30 20:08:27'),
(38, 12, '/images/hazy_horizon_lifestyle.jpg', 'image/jpeg', '2025-03-30 20:08:27', '2025-03-30 20:08:27'),
(39, 13, '/images/pine_walker_preroll.jpg', 'image/jpeg', '2025-03-30 20:08:27', '2025-03-30 20:08:27'),
(40, 14, '/images/velvet_kush_flower.jpg', 'image/jpeg', '2025-03-30 20:08:27', '2025-03-30 20:08:27'),
(41, 15, '/images/schoolboy_q_spesh_preroll.jpeg', 'image/jpeg', '2025-03-31 04:51:26', '2025-03-31 04:51:26'),
(42, 16, '/images/soweto_burner.jpeg', 'image/jpeg', '2025-03-31 04:51:26', '2025-03-31 04:51:26'),
(43, 17, '/images/wizzy_special_preroll.jpeg', 'image/jpeg', '2025-03-31 04:51:26', '2025-03-31 04:51:26'),
(44, 18, '/images/cloud_chaser_vape_cart.jpeg', 'image/jpeg', '2025-03-31 05:03:43', '2025-03-31 05:03:43'),
(45, 19, '/images/midnight_mist_vape.jpeg', 'image/jpeg', '2025-03-31 05:03:43', '2025-03-31 05:03:43'),
(46, 20, '/images/hazy_glow_vape_pod.jpeg', 'image/jpeg', '2025-03-31 05:03:43', '2025-03-31 05:03:43');

-- --------------------------------------------------------

--
-- Table structure for table products
--

CREATE TABLE products (
  id bigint UNSIGNED NOT NULL,
  name varchar(255) NOT NULL,
  type varchar(255) NOT NULL,
  description text NOT NULL,
  price decimal(8,2) NOT NULL,
  thc_percentage float NOT NULL,
  weight float NOT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table products
--

INSERT INTO products (id, name, type, description, price, thc_percentage, weight, created_at, updated_at) VALUES
(1, 'Sativa Topaz Pre-Roll', 'Sativa', 'Brown paper with cannabis speckles, sturdy cone on a wooden shard. 19% THC, earthy depth.', 30.00, 19, 1.2, NULL, NULL),
(2, 'Hybrid Jade Flowers', 'Hybrid', 'A balanced hybrid with floral notes. 18% THC, smooth and uplifting.', 20.00, 18, 1, NULL, NULL),
(5, 'Northern Haze', 'Sativa', 'A vibrant sativa strain with earthy pine notes and a hint of citrus. Perfect for daytime use, offering an uplifting and creative buzz.', 35.00, 22.5, 3.5, '2025-03-30 20:02:06', '2025-03-30 20:02:06'),
(6, 'Midnight Kush', 'Indica', 'A rich, full-bodied indica with deep berry flavors and a relaxing, sedative finish. Ideal for unwinding after a long day.', 40.00, 25, 3.5, '2025-03-30 20:02:06', '2025-03-30 20:02:06'),
(7, 'Golden Hybrid', 'Hybrid', 'A balanced hybrid with smooth floral undertones and a mellow, versatile high. Great for any time of day.', 38.00, 20, 3.5, '2025-03-30 20:02:06', '2025-03-30 20:02:06'),
(8, 'Sour Skunk Pre-Roll', 'Sativa', 'Convenient pre-rolled joints made from our signature Sour Skunk strain, delivering a tangy, energizing kick.', 12.00, 18, 1, '2025-03-30 20:02:06', '2025-03-30 20:02:06'),
(9, 'Lavender Dream', 'Indica', 'A soothing indica with subtle lavender aromas and a calming, sleep-inducing effect. Perfect for nighttime relaxation.', 42.00, 23, 3.5, '2025-03-30 20:02:06', '2025-03-30 20:02:06'),
(10, 'Citrus Burst', 'Sativa', 'A zesty sativa with bold lemon and orange notes, delivering a refreshing and energizing high. Perfect for a morning boost.', 36.00, 21, 3.5, '2025-03-30 20:02:06', '2025-03-30 20:02:06'),
(11, 'Stone Temple Indica', 'Indica', 'A heavy-hitting indica with earthy, spicy undertones and a deep, couch-locking relaxation. Best for late-night chill.', 45.00, 26, 3.5, '2025-03-30 20:02:06', '2025-03-30 20:02:06'),
(12, 'Hazy Horizon', 'Hybrid', 'A smooth hybrid blending sweet and herbal flavors, offering a balanced high for mind and body.', 39.00, 19.5, 3.5, '2025-03-30 20:02:06', '2025-03-30 20:02:06'),
(13, 'Pine Walker Pre-Roll', 'Sativa', 'Pre-rolled convenience with a crisp pine flavor and a light, focused buzz. Great for on-the-go.', 14.00, 17.5, 1, '2025-03-30 20:02:06', '2025-03-30 20:02:06'),
(14, 'Velvet Kush', 'Indica', 'A luxurious indica with velvety vanilla tones and a gentle, soothing effect. Ideal for stress relief.', 41.00, 24, 3.5, '2025-03-30 20:02:06', '2025-03-30 20:02:06'),
(15, 'Schoolboy Q Spesh Pre-Roll', 'Sativa', 'A bold sativa pre-roll with a funky, earthy kick and a smooth, uplifting high. Inspired by Schoolboy Q’s vibe.', 15.00, 19, 1, '2025-03-31 04:50:26', '2025-03-31 04:50:26'),
(16, 'Soweto Burner', 'Hybrid', 'A fiery hybrid pre-roll with spicy herbal notes and a balanced, slow-burning buzz. A nod to Soweto’s energy.', 13.50, 20.5, 1, '2025-03-31 04:50:26', '2025-03-31 04:50:26'),
(17, 'Wizzy Special Pre-Roll', 'Indica', 'A chill indica pre-roll with sweet, smoky flavors and a mellow, body-hugging effect. Wizzy’s finest craft pick.', 14.00, 22, 1, '2025-03-31 04:50:26', '2025-03-31 04:50:26'),
(18, 'Cloud Chaser Vape Cart', 'Sativa', 'A premium sativa vape cartridge with crisp pine and lemon notes, delivering a clear-headed, energizing high. Crafted for smooth, flavorful pulls.', 30.00, 85, 0.5, '2025-03-31 05:03:03', '2025-03-31 05:03:03'),
(19, 'Midnight Mist Disposable Vape', 'Indica', 'A sleek disposable vape pen with rich berry and earthy tones, offering a calming, full-body relaxation. Perfect for nighttime use.', 35.00, 88, 1, '2025-03-31 05:03:03', '2025-03-31 05:03:03'),
(20, 'Hazy Glow Vape Pod', 'Hybrid', 'A balanced hybrid vape pod with sweet floral and herbal flavors, providing a versatile, mellow high. Refillable and artisanal.', 32.00, 82, 0.5, '2025-03-31 05:03:03', '2025-03-31 05:03:03');

-- --------------------------------------------------------

--
-- Table structure for table subscribers
--

CREATE TABLE subscribers (
  id bigint UNSIGNED NOT NULL,
  email varchar(255) NOT NULL,
  created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table subscribers
--

INSERT INTO subscribers (id, email, created_at, updated_at) VALUES
(2, 'okutepa15@gmail.com', '2025-04-02 12:40:51', '2025-04-02 12:40:51'),
(3, 'cruelman25@gmail.com', '2025-04-02 12:41:27', '2025-04-02 12:41:27'),
(4, 'gagnamman@yahoo.com', '2025-04-02 12:44:52', '2025-04-02 12:44:52'),
(5, 'jageemedia@gmail.com', '2025-04-02 13:44:35', '2025-04-02 13:44:35'),
(6, 'testemail@mail.com', '2025-04-02 13:59:07', '2025-04-02 13:59:07'),
(7, 'partyhubnotion@mailing.com', '2025-04-02 14:30:34', '2025-04-02 14:30:34'),
(8, 'alisheryanti@gmail.com', '2025-04-03 04:33:22', '2025-04-03 04:33:22'),
(9, 'joek@mail.com', '2025-04-08 18:00:35', '2025-04-08 18:00:35');

--
-- Indexes for dumped tables
--

--
-- Indexes for table media
--
ALTER TABLE media
  ADD PRIMARY KEY (id),
  ADD KEY product_id (product_id);

--
-- Indexes for table products
--
ALTER TABLE products
  ADD PRIMARY KEY (id);

--
-- Indexes for table subscribers
--
ALTER TABLE subscribers
  ADD PRIMARY KEY (id),
  ADD UNIQUE KEY email (email);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table media
--
ALTER TABLE media
  MODIFY id bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table products
--
ALTER TABLE products
  MODIFY id bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table subscribers
--
ALTER TABLE subscribers
  MODIFY id bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table media
--
ALTER TABLE media
  ADD CONSTRAINT media_ibfk_1 FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
