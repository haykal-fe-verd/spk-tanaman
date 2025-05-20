<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileUploadService
{
    /**
     * Upload a file from a request to the default filesystem disk.
     *
     * @param  Request  $request
     * @param  string  $key
     * @param  string  $path
     * @param  string|null  $existing
     * @return string
     */
    public function upload(Request $request, string $key, string $path, string|null $existing = null): ?string
    {
        if ($existing) {
            Storage::delete($existing);
        }

        return $request->file($key)->store($path);
    }

    /**
     * Delete a file from the default filesystem disk.
     *
     * @param  string  $path
     * @return void
     */
    public function delete(string $path): void
    {
        Storage::delete($path);
    }
}
