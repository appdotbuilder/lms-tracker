<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\XapiStatement
 *
 * @property int $id
 * @property string $statement_id
 * @property int $learner_id
 * @property string $verb
 * @property string $object_type
 * @property string $object_id
 * @property string|null $object_name
 * @property array $raw_statement
 * @property \Illuminate\Support\Carbon $statement_timestamp
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Learner $learner
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|XapiStatement newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|XapiStatement newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|XapiStatement query()
 * @method static \Illuminate\Database\Eloquent\Builder|XapiStatement whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|XapiStatement whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|XapiStatement whereLearnerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|XapiStatement whereObjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|XapiStatement whereObjectName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|XapiStatement whereObjectType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|XapiStatement whereRawStatement($value)
 * @method static \Illuminate\Database\Eloquent\Builder|XapiStatement whereStatementId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|XapiStatement whereStatementTimestamp($value)
 * @method static \Illuminate\Database\Eloquent\Builder|XapiStatement whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|XapiStatement whereVerb($value)
 * @method static \Database\Factories\XapiStatementFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class XapiStatement extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'statement_id',
        'learner_id',
        'verb',
        'object_type',
        'object_id',
        'object_name',
        'raw_statement',
        'statement_timestamp',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'raw_statement' => 'array',
        'statement_timestamp' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the learner that owns the xAPI statement.
     */
    public function learner(): BelongsTo
    {
        return $this->belongsTo(Learner::class);
    }
}