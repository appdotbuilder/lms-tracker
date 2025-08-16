<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Learner
 *
 * @property int $id
 * @property string $learner_id
 * @property string $name
 * @property string $email
 * @property string|null $phone
 * @property string|null $notes
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\XapiStatement[] $xapiStatements
 * @property-read int|null $xapi_statements_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Learner newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Learner newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Learner query()
 * @method static \Illuminate\Database\Eloquent\Builder|Learner whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Learner whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Learner whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Learner whereLearnerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Learner whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Learner whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Learner wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Learner whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Learner whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Learner active()
 * @method static \Database\Factories\LearnerFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Learner extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'learner_id',
        'name',
        'email',
        'phone',
        'notes',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the xAPI statements for the learner.
     */
    public function xapiStatements(): HasMany
    {
        return $this->hasMany(XapiStatement::class);
    }

    /**
     * Scope a query to only include active learners.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Get the route key for the model.
     *
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'learner_id';
    }
}