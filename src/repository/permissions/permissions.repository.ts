import { PermissionRecord } from "./permissions.models";
import { Permission } from "../../entities/permissions.models";
import { executeQuery } from "../../utils/postgresql";
import { convertRecordsToModels } from "./permissions.helper";

export async function getByUserId(userId: string): Promise<Permission[]> {
  const query = {
    text: `
SELECT
    permissions.permission_id,
    permissions.code
FROM permissions
INNER JOIN group_permissions
ON group_permissions.permission_id = permissions.permission_id
INNER JOIN groups
ON groups.group_id = group_permissions.group_id
INNER JOIN user_groups
ON user_groups.group_id = groups.group_id
WHERE user_groups.user_id = $1
GROUP BY
    permissions.permission_id,
    permissions.code
`,
    values: [userId]
  };

  const { rows } = await executeQuery<PermissionRecord>(query);
  return convertRecordsToModels(rows);
}
