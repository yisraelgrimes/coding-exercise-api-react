<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    protected $fillable = [
        'group_name'
    ];

    /**
     * Get the people for a group
     */
    public function people()
    {
        return $this->hasMany('App\Models\Person');
    }
}
