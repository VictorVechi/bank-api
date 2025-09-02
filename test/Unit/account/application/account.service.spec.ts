import { Decimal } from '@prisma/client/runtime/library';
import { AccountService } from 'src/account/application/account.service';
import { AccountRepositoryInterface } from 'src/account/domain/repository/account-repository.interface';

describe('AccountService', () => {
    let service: AccountService;
    let repository: jest.Mocked<AccountRepositoryInterface>;
    jest.spyOn(console, 'error').mockImplementation(() => {});

    beforeEach(() => {
        repository = {
            resetTable: jest.fn(),
            findById: jest.fn(),
            save: jest.fn(),
            saveAll: jest.fn(),
            delete: jest.fn(),
        } as any;
        service = new AccountService(repository);
    });

    it('should reset table', async () => {
        await service.reset();
        expect(repository.resetTable).toHaveBeenCalled();
    });

    it('should capture an exception when resetting table', async () => {
        repository.resetTable.mockRejectedValue(new Error('Error'));
        await expect(service.reset()).rejects.toThrow('Failed to reset account table');
    });

    it('should return null if account does not exist', async () => {
        repository.findById.mockResolvedValue(null);
        const result = await service.getBalance('id');
        expect(result).toBeNull();
    });

    it('should capture an exception when finding account by ID', async () => {
        repository.findById.mockRejectedValue(new Error('Error'));
        await expect(service.findAccountById('id')).rejects.toThrow('Failed to find account');
    });

    it('should return balance as number', async () => {
        repository.findById.mockResolvedValue({
            id: 'id',
            balance: { toNumber: () => 100 },
            createdAt: new Date(),
            updatedAt: new Date(),
        } as any);
        const result = await service.getBalance('id');
        expect(result).toBe(100);
    });

    it('should capture an exception when getting balance', async () => {
        repository.findById.mockRejectedValue(new Error('Error'));
        await expect(service.getBalance('id')).rejects.toThrow('Failed to fetch account balance');
    });
});