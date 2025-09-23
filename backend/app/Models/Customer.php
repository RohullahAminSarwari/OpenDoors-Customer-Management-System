<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'address',
        'email',
        'password',
        'type',
        'passport_number',
        'status'
    ];

    protected $hidden = [
        'password',
    ];

    protected $casts = [
        'password' => 'hashed',
    ];

    const TYPE_OFFICE = 'office';
    const TYPE_ONLINE = 'online';

    const STATUS_INACTIVE = 'inactive';
    const STATUS_ACTIVE = 'active';
    const STATUS_PROCESS = 'process';
    const STATUS_COMPLETED = 'completed';
    const STATUS_SUBMITTED = 'submitted';

    public static function getTypes()
    {
        return [
            self::TYPE_OFFICE,
            self::TYPE_ONLINE
        ];
    }

    public static function getStatuses()
    {
        return [
            self::STATUS_INACTIVE,
            self::STATUS_ACTIVE,
            self::STATUS_PROCESS,
            self::STATUS_COMPLETED,
            self::STATUS_SUBMITTED
        ];
    }
}