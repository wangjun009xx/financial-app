﻿


// <autogenerated>
//   This file was generated using Repositories.tt.
//   Any changes made manually will be lost next time the file is regenerated.
// </autogenerated>


namespace App.Models.Domain.Repositories {
    using System.Data.Entity;
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;

        
    public sealed partial class SheetRepository {
        private readonly DbContext _dbContext;
        private readonly DbSet<App.Models.Domain.Sheet> _entitySet;

        public SheetRepository(DbContext dbContext) {
            this._dbContext = dbContext;
            this._entitySet = dbContext.Set<App.Models.Domain.Sheet>();
        }

        [CanBeNull]
        public App.Models.Domain.Sheet FindById(int id) {
            return this._entitySet.FirstOrDefault(x => x.Id == id);
        }

        [CanBeNull]
        public Task<App.Models.Domain.Sheet> FindByIdAsync(int id) {
            return this._entitySet.FirstOrDefaultAsync(x => x.Id == id);
        }

        [NotNull]
        public IQueryable<App.Models.Domain.Sheet> GetAll() {
            return this._entitySet;
        }

        

        public void Add(App.Models.Domain.Sheet item) {
            this._entitySet.Add(item);
        }

		public void Delete(App.Models.Domain.Sheet item) {
			if (item != null) {
				this._entitySet.Remove(item);
			}
		}

		public void DeleteById(int id) {
			App.Models.Domain.Sheet item = this.FindById(id);
			if (item != null) {
				this._entitySet.Remove(item);
			}
		}

        public int SaveChanges() {
            return this._dbContext.SaveChanges();
        }

        public Task SaveChangesAsync() {
            return this._dbContext.SaveChangesAsync();
        }
    }

        
    public sealed partial class CategoryRepository {
        private readonly DbContext _dbContext;
        private readonly DbSet<App.Models.Domain.Category> _entitySet;

        public CategoryRepository(DbContext dbContext) {
            this._dbContext = dbContext;
            this._entitySet = dbContext.Set<App.Models.Domain.Category>();
        }

        [CanBeNull]
        public App.Models.Domain.Category FindById(int id) {
            return this._entitySet.FirstOrDefault(x => x.Id == id);
        }

        [CanBeNull]
        public Task<App.Models.Domain.Category> FindByIdAsync(int id) {
            return this._entitySet.FirstOrDefaultAsync(x => x.Id == id);
        }

        [NotNull]
        public IQueryable<App.Models.Domain.Category> GetAll() {
            return this._entitySet;
        }

        
        [NotNull]
        public IQueryable<App.Models.Domain.Category> GetByOwner(App.Models.Domain.AppOwner owner) {
            return this._entitySet.Where(x => x.Owner.Id == owner.Id);
        }

        [NotNull]
        public IQueryable<App.Models.Domain.Category> GetByOwner(int ownerId) {
            return this._entitySet.Where(x => x.Owner.Id == ownerId);
        }

                

        public void Add(App.Models.Domain.Category item) {
            this._entitySet.Add(item);
        }

		public void Delete(App.Models.Domain.Category item) {
			if (item != null) {
				this._entitySet.Remove(item);
			}
		}

		public void DeleteById(int id) {
			App.Models.Domain.Category item = this.FindById(id);
			if (item != null) {
				this._entitySet.Remove(item);
			}
		}

        public int SaveChanges() {
            return this._dbContext.SaveChanges();
        }

        public Task SaveChangesAsync() {
            return this._dbContext.SaveChangesAsync();
        }
    }

        
    public sealed partial class AppOwnerRepository {
        private readonly DbContext _dbContext;
        private readonly DbSet<App.Models.Domain.AppOwner> _entitySet;

        public AppOwnerRepository(DbContext dbContext) {
            this._dbContext = dbContext;
            this._entitySet = dbContext.Set<App.Models.Domain.AppOwner>();
        }

        [CanBeNull]
        public App.Models.Domain.AppOwner FindById(int id) {
            return this._entitySet.FirstOrDefault(x => x.Id == id);
        }

        [CanBeNull]
        public Task<App.Models.Domain.AppOwner> FindByIdAsync(int id) {
            return this._entitySet.FirstOrDefaultAsync(x => x.Id == id);
        }

        [NotNull]
        public IQueryable<App.Models.Domain.AppOwner> GetAll() {
            return this._entitySet;
        }

        

        public void Add(App.Models.Domain.AppOwner item) {
            this._entitySet.Add(item);
        }

		public void Delete(App.Models.Domain.AppOwner item) {
			if (item != null) {
				this._entitySet.Remove(item);
			}
		}

		public void DeleteById(int id) {
			App.Models.Domain.AppOwner item = this.FindById(id);
			if (item != null) {
				this._entitySet.Remove(item);
			}
		}

        public int SaveChanges() {
            return this._dbContext.SaveChanges();
        }

        public Task SaveChangesAsync() {
            return this._dbContext.SaveChangesAsync();
        }
    }

    }

