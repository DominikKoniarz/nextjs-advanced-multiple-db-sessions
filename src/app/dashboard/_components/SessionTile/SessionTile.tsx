import type { Session } from "lucia";
import SessionTileCurrent from "./SessionTileCurrent";
import SessionTileIdWithToolTip from "./SessionTileIdWithToolTip";
import SessionTileData from "./SessionTileData";
import SessionTileDeleteAlert from "./SessionTileDeleteAlert";

type Props = {
    session: Session;
    isCurrent: boolean;
};

export default function SessionTile({ session, isCurrent }: Props) {
    return (
        <div className="w-full rounded-md border-2 bg-white p-4 text-copy">
            <div className="mb-1 flex flex-row items-center justify-between">
                <SessionTileIdWithToolTip id={session.id} />
                <SessionTileDeleteAlert
                    key={`delete-session-alert-${session.id}`}
                />
            </div>
            <div className="flex flex-row items-end justify-between">
                <SessionTileData session={session} />
                {isCurrent && <SessionTileCurrent />}
            </div>
        </div>
    );
}
