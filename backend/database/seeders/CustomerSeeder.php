<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Customer;
use Illuminate\Support\Facades\Hash;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing data
        Customer::truncate();

        // Create sample customers
        $customers = [
            [
                'name' => 'John Doe',
                'email' => 'john.doe@email.com',
                'password' => Hash::make('password123'),
                'address' => '123 Main Street, New York, NY 10001, USA',
                'type' => 'office',
                'passport_number' => 'A12345678',
                'status' => 'active'
            ],
            [
                'name' => 'Sarah Smith',
                'email' => 'sarah.smith@email.com',
                'password' => Hash::make('password123'),
                'address' => '456 Oak Avenue, Los Angeles, CA 90210, USA',
                'type' => 'online',
                'passport_number' => 'B87654321',
                'status' => 'process'
            ],
            [
                'name' => 'Mike Johnson',
                'email' => 'mike.johnson@email.com',
                'password' => Hash::make('password123'),
                'address' => '789 Pine Road, Chicago, IL 60601, USA',
                'type' => 'office',
                'passport_number' => 'C11223344',
                'status' => 'submitted'
            ],
            [
                'name' => 'Emily Davis',
                'email' => 'emily.davis@email.com',
                'password' => Hash::make('password123'),
                'address' => '321 Elm Street, Houston, TX 77001, USA',
                'type' => 'online',
                'passport_number' => 'D55667788',
                'status' => 'completed'
            ],
            [
                'name' => 'Robert Wilson',
                'email' => 'robert.wilson@email.com',
                'password' => Hash::make('password123'),
                'address' => '654 Maple Drive, Phoenix, AZ 85001, USA',
                'type' => 'office',
                'passport_number' => 'E99887766',
                'status' => 'inactive'
            ],
            [
                'name' => 'Lisa Anderson',
                'email' => 'lisa.anderson@email.com',
                'password' => Hash::make('password123'),
                'address' => '987 Cedar Lane, Philadelphia, PA 19101, USA',
                'type' => 'online',
                'passport_number' => 'F44556677',
                'status' => 'active'
            ],
            [
                'name' => 'David Brown',
                'email' => 'david.brown@email.com',
                'password' => Hash::make('password123'),
                'address' => '147 Birch Street, San Antonio, TX 78201, USA',
                'type' => 'office',
                'passport_number' => 'G88990011',
                'status' => 'process'
            ],
            [
                'name' => 'Jennifer Garcia',
                'email' => 'jennifer.garcia@email.com',
                'password' => Hash::make('password123'),
                'address' => '258 Walnut Avenue, San Diego, CA 92101, USA',
                'type' => 'online',
                'passport_number' => 'H22334455',
                'status' => 'completed'
            ]
        ];

        foreach ($customers as $customerData) {
            Customer::create($customerData);
        }

        $this->command->info('Customer seeder completed! Created ' . count($customers) . ' sample customers.');
    }
}