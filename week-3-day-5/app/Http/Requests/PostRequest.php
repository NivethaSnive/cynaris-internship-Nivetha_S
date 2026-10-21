<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PostRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $postId = $this->route('post')?->id;

        return [
            'title' => [
                'required',
                'min:3',
                'max:255',
                Rule::unique('posts', 'title')->ignore($postId),
            ],
            'body' => [
                'required',
                'min:10',
                'max:5000',
            ],
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'Please enter a title.',
            'title.min' => 'The title must contain at least 3 characters.',
            'title.max' => 'The title cannot exceed 255 characters.',
            'title.unique' => 'This title already exists.',
            'body.required' => 'Please enter the post content.',
            'body.min' => 'The post content must contain at least 10 characters.',
            'body.max' => 'The post content cannot exceed 5000 characters.',
        ];
    }
}
