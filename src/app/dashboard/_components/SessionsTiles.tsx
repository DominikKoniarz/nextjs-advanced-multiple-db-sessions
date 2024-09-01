import type { Session } from "lucia";
import SessionTile from "./SessionTile/SessionTile";

export default async function SessionsTiles({
    sessionsPromise,
    currentSessionId,
}: {
    sessionsPromise: Promise<Session[]>;
    currentSessionId: string;
}) {
    const sessions = await sessionsPromise;

    return (
        <>
            {sessions.length > 0 && (
                <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
                    {sessions.map((item) => (
                        <SessionTile
                            key={item.id}
                            session={item}
                            isCurrent={item.id === currentSessionId}
                        />
                    ))}
                </div>
            )}
        </>
    );
}
