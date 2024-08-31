import type { Session } from "lucia";

export default function SessionTileData({ session }: { session: Session }) {
    return (
        <div>
            <p>IP: {session.ip}</p>
            <p>Browser: {session.browserName ?? "Unknown"}</p>
            <p>OS: {session.osName ?? "Unknown"}</p>
        </div>
    );
}
