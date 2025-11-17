
interface CommentType {
    id: number;
    content: string;
    createdAt: string;
}

interface CommentProps {
    comment: CommentType;
    onEdit: () => void;
    refreshComments: () => void;
}

export function CommentFormat({comment, onEdit, refreshComments}: CommentProps) {
    return (
        <li
            className="bg-gray-50 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-lg p-4 border border-gray-200"
        >
            <div className="flex flex-row justify-between items-start gap-4">
                <div className="flex-1">
                    <p className="text-gray-700 leading-relaxed mb-2">
                        {comment.content}
                    </p>
                    <small className="text-gray-500 text-sm">
                        <div className="flex flex-1 flex-row justify-between items-center">
                        {new Date(comment.createdAt).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                        <button 
                            onClick={onEdit}
                            className="ml-4 text-blue-500 hover:underline px-4 py-2" 
                            style={{'backgroundColor': "yellow", 'borderRadius': '12px'}}
                        >
                            ✏️
                        </button>
                        </div>
                    </small>
                </div>
            </div>
        </li>
    )
}
