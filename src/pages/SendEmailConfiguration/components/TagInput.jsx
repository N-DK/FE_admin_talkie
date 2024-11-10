import React, { useState } from 'react';

function TagInput({
    tags,
    setTags,
    placeholder = 'Nhập thẻ',
    suggestions = [],
}) {
    const [input, setInput] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [filteredSuggestions, setFilteredSuggestions] = useState([
        'test',
        'test2',
        'test3',
    ]);

    // Hàm thêm thẻ mới
    const addTag = (tag) => {
        if (tag && !tags.includes(tag)) {
            setTags([...tags, tag]);
            setInput(''); // Reset input sau khi thêm
            setFilteredSuggestions([]); // Reset gợi ý sau khi thêm
        }
    };

    // Hàm xóa thẻ
    const removeTag = (index) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    // Xử lý khi nhập liệu để hiển thị danh sách gợi ý
    const handleChange = (e) => {
        const { value } = e.target;
        setInput(value);

        if (value) {
            const filtered = suggestions
                .filter((suggestion) =>
                    suggestion.toLowerCase().includes(value.toLowerCase()),
                )
                .filter((suggestion) => !tags.includes(suggestion)); // Loại bỏ các từ đã có trong tags
            setFilteredSuggestions(filtered);
        } else {
            setFilteredSuggestions([]);
        }
    };

    // Xử lý khi nhấn vào một gợi ý
    const handleSuggestionClick = (suggestion) => {
        addTag(suggestion);
    };

    // Tắt gợi ý khi người dùng nhấp bên ngoài
    const handleBlur = () => {
        setTimeout(() => setIsFocused(false), 100);
    };

    return (
        <div className="relative w-full">
            <div
                className="flex flex-wrap items-center p-2 border border-gray-300 rounded"
                onFocus={() => setIsFocused(true)}
                onBlur={handleBlur}
            >
                {tags.map((tag, index) => (
                    <div
                        key={index}
                        className="flex items-center bg-blue-100 text-blue-700 px-2 py-1 mr-1 rounded-full text-sm"
                    >
                        {tag}
                        <button
                            type="button"
                            onClick={() => removeTag(index)}
                            className="ml-2 text-blue-700 hover:text-blue-900"
                        >
                            &times;
                        </button>
                    </div>
                ))}
                <input
                    type="text"
                    value={input}
                    onChange={handleChange}
                    placeholder={
                        isFocused || tags.length > 0 ? '' : placeholder
                    }
                    className="flex-grow outline-none p-1 text-sm bg-transparent"
                />
            </div>

            {/* Dropdown gợi ý hiển thị dưới input */}
            {isFocused && filteredSuggestions.length > 0 && (
                <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10 max-h-48 overflow-auto">
                    {filteredSuggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            onMouseDown={() =>
                                handleSuggestionClick(suggestion)
                            }
                            className="cursor-pointer p-2 hover:bg-blue-500 hover:text-white"
                        >
                            {suggestion}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default TagInput;
