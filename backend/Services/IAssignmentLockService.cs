namespace TaskManagerBackend.Services
{
    public interface IAssignmentLockService
    {
        SemaphoreSlim GetLock();
    }
}
