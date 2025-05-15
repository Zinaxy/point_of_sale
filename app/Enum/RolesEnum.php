<?php

namespace App\Enum;

enum RolesEnum:string
{
    case Admin = 'admin';
    case Manager = 'manager';
    case Cashier = 'cashier';

    public static function labels():array
    {
        return [
            self::Admin->value =>'Admin',
            self::manager->value =>'manager',
            self::cashier->value =>'cashier',
        ];
    }

    public function label()
    {
        return match ($this) {
            self::Admin =>'Admin',
            self::manager =>'manager',
            self::cashier =>'cashier',
        } ;
    }
}


