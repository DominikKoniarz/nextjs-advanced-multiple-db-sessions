export default function ProseSection({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="prose-lg mx-auto h-fit bg-white text-base text-copy prose-h2:mb-4 prose-h2:text-lg prose-h2:font-semibold prose-h2:tracking-wider md:text-lg md:prose-h2:text-xl">
            {children}
        </div>
    );
}
