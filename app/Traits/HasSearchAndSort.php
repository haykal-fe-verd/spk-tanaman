<?php

namespace App\Traits;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;

trait HasSearchAndSort
{
    protected array $allowedSorts = ['created_at'];
    protected string $defaultSortBy = 'created_at';
    protected string $defaultSortDir = 'desc';
    protected int $defaultPerPage = 10;

    protected function applySearch(Builder $query, Request $request, array $columns = []): Builder
    {
        $search = $request->get('search');

        if ($search && !empty($columns)) {
            $query->where(function ($q) use ($columns, $search) {
                foreach ($columns as $col) {
                    $q->orWhere($col, 'like', "%{$search}%");
                }
            });
        }

        return $query;
    }

    protected function applySort(Builder $query, Request $request): Builder
    {
        $sortBy = $request->get('sort_by', $this->defaultSortBy);
        $sortDir = $request->get('sort_dir', $this->defaultSortDir);

        if (in_array($sortBy, $this->allowedSorts)) {
            $query->orderBy($sortBy, $sortDir);
        }

        return $query;
    }

    protected function resolvePerPage(Request $request): int
    {
        return (int) $request->get('per_page', $this->defaultPerPage);
    }
}
