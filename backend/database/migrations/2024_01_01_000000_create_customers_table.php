<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255);
            $table->text('address');
            $table->string('email', 255)->unique();
            $table->string('password');
            $table->enum('type', ['office', 'online']);
            $table->string('passport_number', 50)->unique();
            $table->enum('status', ['inactive', 'active', 'process', 'completed', 'submitted'])->default('inactive');
            $table->timestamps();
            
            // Add indexes for better performance
            $table->index('email');
            $table->index('passport_number');
            $table->index('status');
            $table->index('type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};