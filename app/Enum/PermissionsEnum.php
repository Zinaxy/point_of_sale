<?php

namespace App\Enum;

enum PermissionsEnum: string
{
    case ManageShops = 'manage_shops';
    case ManageUsers = 'manage_users';
    case ManageProducts = 'manage_products';
    case ManageSales = 'manage_sales';
}
