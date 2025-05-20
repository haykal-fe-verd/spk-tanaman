<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Auth;

class Helpers
{
    /**
     * Check if the current user is an administrator.
     *
     * @return bool True if the user is an administrator, false otherwise.
     */
    function is_admin(): bool
    {
        return Auth::check() && Auth::user()->role === 'admin';
    }

    /**
     * Converts a given string into a slug by replacing non-alphanumeric characters
     * with hyphens, trimming whitespace, and converting to lowercase.
     *
     * @param string $text The input string to be slugified.
     * @return string The slugified version of the input string.
     */
    function slugify(string $text): string
    {
        return strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $text)));
    }

    /**
     * Returns the age of the given date.
     *
     * @param string $date The date string to get the age from, in any format
     *                      that strtotime() can understand.
     * @return int The age of the given date in years.
     */
    function get_age($date)
    {
        return (date('Y') - date('Y', strtotime($date)));
    }

    /**
     * Format a given number into a string representing the amount in Indonesian
     * Rupiah.
     *
     * @param int|float $number The amount to be formatted.
     * @return string The formatted string with the amount in Indonesian Rupiah.
     */
    function format_rupiah($number): string
    {
        return 'Rp ' . number_format($number, 0, ',', '.');
    }
}
