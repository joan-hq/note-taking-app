import MDEditor, { commands } from '@uiw/react-md-editor';
import { useEffect, useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import rehypePrism from 'rehype-prism-plus';


interface MarkdownEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export const MarkdownEditor = ({ value, onChange }: MarkdownEditorProps) => {
    const [previewMode, setPreviewMode] = useState<'live' | 'edit'>('edit');
    const [showMore, setShowMore] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            setPreviewMode(mobile ? 'edit' : 'live');
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 1. Mobile core buttons (Compact view)
    const baseCommands = [
        { ...commands.bold, groupName: "Bold" },
        { ...commands.italic, groupName: "Italic" },
        { ...commands.title, groupName: "Title" },
        commands.divider,
        { ...commands.unorderedListCommand, groupName: "List" },
    ];

    // 2. Extra buttons revealed when clicking "..."
    const extendedCommands = [
        ...baseCommands,
        { ...commands.checkedListCommand, groupName: "Task List" },
        { ...commands.link, groupName: "Link" },
        { ...commands.quote, groupName: "Quote" },
        { ...commands.code, groupName: "Code" },
    ];

    // 3. Complete mobile dataset with the customize feature toggle
    const mobileCommands = [
        ...(showMore ? extendedCommands : baseCommands),
        commands.divider,
        {
            name: 'more',
            keyCommand: 'more',
            buttonProps: {
                'aria-label': 'More options',
                title: 'More options',
                style: { color: 'var(--text-primary)' }
            },
            icon: <MoreHorizIcon sx={{ fontSize: 18 }} />,
            execute: () => setShowMore(!showMore)
        }
    ];

    // 4. Fully unrolled desktop commands
    const desktopCommands = [
        { ...commands.bold, groupName: "Bold" },
        { ...commands.italic, groupName: "Italic" },
        { ...commands.strikethrough, groupName: "Strikethrough" },
        commands.divider,
        { ...commands.title, groupName: "Title" },
        commands.divider,
        { ...commands.link, groupName: "Link" },
        { ...commands.quote, groupName: "Quote" },
        { ...commands.code, groupName: "Code" },
        { ...commands.codeBlock, groupName: "Code Block" },
        commands.divider,
        { ...commands.unorderedListCommand, groupName: "Unordered List" },
        { ...commands.orderedListCommand, groupName: "Ordered List" },
        { ...commands.checkedListCommand, groupName: "Task List" },
    ];

    const englishExtraCommands = [
        { ...commands.codeEdit, groupName: "Edit Mode" },
        { ...commands.codeLive, groupName: "Live Preview Mode" },
        { ...commands.codePreview, groupName: "Preview Mode" },
    ];

    return (
        <div className="w-full h-full custom-md-editor-container" data-color-mode="light">
            <MDEditor
                value={value}
                onChange={(val) => onChange(val || "")}
                preview={previewMode}
                height="100%"
                textareaProps={{
                    placeholder: "Start writing with markdown..."
                }}
                commands={isMobile ? mobileCommands : desktopCommands}
                extraCommands={isMobile ? [] : englishExtraCommands}
                className="w-full h-full"
                previewOptions={{
                    rehypePlugins: [[rehypePrism]],
                }}
            />
        </div>
    );
};