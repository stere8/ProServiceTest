namespace TaskManagerBackend.Services
{
    public class AssignmentLockService : IAssignmentLockService
    {
        private readonly SemaphoreSlim _assignmentLock = new SemaphoreSlim(1, 1);

        public SemaphoreSlim GetLock()
        {
            return _assignmentLock;
        }
    }
}
