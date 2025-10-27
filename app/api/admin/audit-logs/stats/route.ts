import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { requireAdmin } from '@/lib/middleware/auth';

interface AuditLogEntry {
  action_type?: string | null;
  entity_type?: string | null;
}

export async function GET() {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    // Get action counts
    const { data: actionsData, error: actionsError } = await supabaseAdmin
      .from('audit_logs')
      .select('action_type')
      .not('action_type', 'is', null);
    
    if (actionsError) throw actionsError;

    // Count action types
    const actionCounts = (actionsData as AuditLogEntry[]).reduce<Record<string, number>>((acc, { action_type }) => {
      if (action_type) {
        acc[action_type] = (acc[action_type] || 0) + 1;
      }
      return acc;
    }, {});

    // Get entity counts
    const { data: entitiesData, error: entitiesError } = await supabaseAdmin
      .from('audit_logs')
      .select('entity_type')
      .not('entity_type', 'is', null);
    
    if (entitiesError) throw entitiesError;

    // Count entity types
    const entityCounts = (entitiesData as AuditLogEntry[]).reduce<Record<string, number>>((acc, { entity_type }) => {
      if (entity_type) {
        acc[entity_type] = (acc[entity_type] || 0) + 1;
      }
      return acc;
    }, {});

    const stats = {
      actions: {
        create: actionCounts['create'] || 0,
        update: actionCounts['update'] || 0,
        delete: actionCounts['delete'] || 0,
      },
      entities: {
        users: entityCounts['user'] || 0,
        permissions: entityCounts['permission'] || 0,
        reports: entityCounts['report'] || 0,
      },
      total: {
        actions: Object.values<number>(actionCounts).reduce((sum, count) => sum + count, 0),
        entities: Object.values<number>(entityCounts).reduce((sum, count) => sum + count, 0),
      }
    };

    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
