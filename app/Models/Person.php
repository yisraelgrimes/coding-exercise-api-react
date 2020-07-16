<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'email_address',
        'status',
        'group_id'
    ];

    /**
     * Get the group for a person
     */
    public function group()
    {
        return $this->belongsTo('App\Models\Group');
    }
}
