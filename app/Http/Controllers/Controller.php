<?php

namespace App\Http\Controllers;

use App\Traits\ApiResponse;
use App\Traits\HasSearchAndSort;

abstract class Controller
{
    use ApiResponse, HasSearchAndSort;
}
