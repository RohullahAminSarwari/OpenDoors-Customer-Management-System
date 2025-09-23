<?php
// PHP Configuration Check Script

echo "=== PHP Configuration Check ===\n";
echo "PHP Version: " . phpversion() . "\n";
echo "PHP Configuration File: " . php_ini_loaded_file() . "\n\n";

echo "=== Extensions Check ===\n";

// Check important extensions
$required_extensions = [
    'zip',
    'mysqli', 
    'pdo',
    'pdo_mysql',
    'openssl',
    'curl',
    'json',
    'mbstring'
];

foreach ($required_extensions as $ext) {
    $status = extension_loaded($ext) ? '✅ LOADED' : '❌ MISSING';
    echo sprintf("%-10s: %s\n", $ext, $status);
}

echo "\n=== Memory & Limits ===\n";
echo "Memory Limit: " . ini_get('memory_limit') . "\n";
echo "Max Execution Time: " . ini_get('max_execution_time') . "s\n";
echo "Upload Max Filesize: " . ini_get('upload_max_filesize') . "\n";

echo "\n=== Composer Check ===\n";
if (file_exists('vendor/autoload.php')) {
    echo "✅ vendor/autoload.php EXISTS\n";
    try {
        require 'vendor/autoload.php';
        echo "✅ Autoloader works correctly\n";
    } catch (Exception $e) {
        echo "❌ Autoloader error: " . $e->getMessage() . "\n";
    }
} else {
    echo "❌ vendor/autoload.php NOT FOUND\n";
    echo "   Run: composer install\n";
}

echo "\n=== Database Check ===\n";
try {
    $pdo = new PDO('mysql:host=localhost;port=3306', 'root', '');
    echo "✅ MySQL connection successful\n";
    
    // Check if database exists
    $stmt = $pdo->prepare("SHOW DATABASES LIKE 'opendoors_customers'");
    $stmt->execute();
    if ($stmt->rowCount() > 0) {
        echo "✅ Database 'opendoors_customers' exists\n";
    } else {
        echo "⚠️  Database 'opendoors_customers' not found\n";
        echo "   Create it manually or run setup script\n";
    }
} catch (PDOException $e) {
    echo "❌ MySQL connection failed: " . $e->getMessage() . "\n";
    echo "   Make sure XAMPP MySQL is running\n";
}

echo "\n=== Laravel Check ===\n";
if (file_exists('artisan')) {
    echo "✅ artisan file exists\n";
    if (file_exists('vendor/autoload.php')) {
        try {
            // Try to load Laravel
            require 'vendor/autoload.php';
            $app = require_once 'bootstrap/app.php';
            echo "✅ Laravel application loads successfully\n";
        } catch (Exception $e) {
            echo "❌ Laravel load error: " . $e->getMessage() . "\n";
        }
    }
} else {
    echo "❌ artisan file not found\n";
}

echo "\n=== Recommendations ===\n";

if (!extension_loaded('zip')) {
    echo "1. Enable zip extension in php.ini\n";
    echo "   Edit: " . php_ini_loaded_file() . "\n";
    echo "   Uncomment: extension=zip\n";
}

if (!file_exists('vendor/autoload.php')) {
    echo "2. Complete Composer installation:\n";
    echo "   composer install --no-dev\n";
}

echo "\nDone!\n";
?>