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

    /**
     * Applies search query to given query builder.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param \Illuminate\Http\Request $request
     * @param array $columns
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    protected function applySearch(Builder $query, Request $request, array $columns = []): Builder
    {
        $search = $request->get('search');

        if (!$search || empty($columns)) {
            return $query;
        }

        $model = method_exists($query, 'getModel') ? $query->getModel() : null;

        return $query->where(function ($q) use ($columns, $search, $model) {
            foreach ($columns as $col) {
                if (str_contains($col, '.') && $model) {
                    [$relation, $column] = explode('.', $col);
                    $relationInstance = $model->{$relation}();
                    $relatedTable = $relationInstance->getRelated()->getTable();
                    $foreignKey = $relationInstance->getQualifiedForeignKeyName();

                    if (!collect($q->getQuery()->joins)->pluck('table')->contains($relatedTable)) {
                        $q->leftJoin($relatedTable, $foreignKey, '=', "{$relatedTable}.id");
                    }

                    $q->orWhere("{$relatedTable}.{$column}", 'like', "%{$search}%");
                } else {
                    $table = $model?->getTable() ?? '';
                    $q->orWhere("{$table}.{$col}", 'like', "%{$search}%");
                }
            }
        });
    }

    /**
     * Applies sorting to given query builder.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    protected function applySort(Builder $query, Request $request): Builder
    {
        $sortBy = $request->get('sort_by', $this->defaultSortBy);
        $sortDir = $request->get('sort_dir', $this->defaultSortDir);

        if (!in_array($sortBy, $this->allowedSorts)) {
            return $query;
        }

        $model = method_exists($query, 'getModel') ? $query->getModel() : null;

        if (str_contains($sortBy, '.') && $model) {
            [$relation, $column] = explode('.', $sortBy);

            $relationInstance = $model->{$relation}();
            $relatedTable = $relationInstance->getRelated()->getTable();
            $foreignKey = $relationInstance->getQualifiedForeignKeyName();

            if (!collect($query->getQuery()->joins)->pluck('table')->contains($relatedTable)) {
                $query->leftJoin($relatedTable, $foreignKey, '=', "{$relatedTable}.id");
            }

            $query->orderBy("{$relatedTable}.{$column}", $sortDir)
                ->select("{$model->getTable()}.*");
        } else {
            $query->orderBy($sortBy, $sortDir);
        }

        return $query;
    }

    /**
     * Resolve the number of items per page based on the request.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return int
     */
    protected function resolvePerPage(Request $request): int
    {
        return (int) $request->get('per_page', $this->defaultPerPage);
    }
}
