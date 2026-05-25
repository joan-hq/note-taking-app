import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NoteService } from '@/features/notes/api/noteServices';

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const {id} = await params;
      console.log('DELETE called, id:', id); //
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
       console.log('calling deletePermanently');
    await NoteService.deletePermanently(id);
     console.log('DELETE done');
    return NextResponse.json({ success: true });
}