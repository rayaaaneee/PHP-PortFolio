<?php
// Site
define('PATH_ASSETS', './asset/');
define('PATH_CSS', PATH_ASSETS . 'css/');
define('PATH_JS', PATH_ASSETS . 'js/');
define('PATH_IMG', PATH_ASSETS . 'img/');
define('PATH_MEDIA', PATH_CSS . 'media/');

// Path
define('PATH_VIEWS', './view/v_');
define('PATH_MODELS', './model/');
define('PATH_CONTROLLERS', './controller/c_');
define('PATH_DATABASE', PATH_MODELS . 'database/');
define('PATH_DAO', PATH_DATABASE . 'dao/');
define('PATH_DTO', PATH_DATABASE . 'dto/');

// Database
define('DB_HOST', 'localhost');
define('DB_NAME', 'hangman');
define('DB_PORT', '8889');
define('DB_CHARSET', 'utf8mb4');

const DB_USR = 'root';
const DB_PWD = 'root';