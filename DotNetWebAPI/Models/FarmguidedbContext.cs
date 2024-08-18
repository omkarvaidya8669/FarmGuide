using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace LoginService.Models;

public partial class FarmguidedbContext : DbContext
{
    public FarmguidedbContext()
    {
    }

    public FarmguidedbContext(DbContextOptions<FarmguidedbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Cart> Carts { get; set; }

    public virtual DbSet<City> Cities { get; set; }

    public virtual DbSet<Farmer> Farmers { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<OrderDetail> OrderDetails { get; set; }

    public virtual DbSet<Payment> Payments { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<ProductFarmer> ProductFarmers { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Subproduct> Subproducts { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<Wholesaler> Wholesalers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=localhost;port=3306;user=root;password=Nishant047;database=farmguidedb", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.2.0-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Cart>(entity =>
        {
            entity.HasKey(e => e.Cartid).HasName("PRIMARY");

            entity.ToTable("cart");

            entity.HasIndex(e => e.Pfid, "pfid_idx");

            entity.HasIndex(e => e.Wid, "wid_idx");

            entity.Property(e => e.Cartid).HasColumnName("cartid");
            entity.Property(e => e.Pfid).HasColumnName("pfid");
            entity.Property(e => e.Quantity).HasColumnName("quantity");
            entity.Property(e => e.Wid).HasColumnName("wid");

            entity.HasOne(d => d.Pf).WithMany(p => p.Carts)
                .HasForeignKey(d => d.Pfid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("pfid");

            entity.HasOne(d => d.WidNavigation).WithMany(p => p.Carts)
                .HasForeignKey(d => d.Wid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("wid");
        });

        modelBuilder.Entity<City>(entity =>
        {
            entity.HasKey(e => e.Cityid).HasName("PRIMARY");

            entity.ToTable("cities");

            entity.Property(e => e.Cityid).HasColumnName("cityid");
            entity.Property(e => e.Cityname)
                .HasMaxLength(45)
                .HasColumnName("cityname");
        });

        modelBuilder.Entity<Farmer>(entity =>
        {
            entity.HasKey(e => e.Fid).HasName("PRIMARY");

            entity.ToTable("farmer");

            entity.HasIndex(e => e.AadharNo, "aadhar_no_UNIQUE").IsUnique();

            entity.HasIndex(e => e.Cityid, "cityid_idx");

            entity.HasIndex(e => e.MobileNo, "mobile_no_UNIQUE").IsUnique();

            entity.HasIndex(e => e.Uid, "uid_idx");

            entity.Property(e => e.Fid).HasColumnName("fid");
            entity.Property(e => e.AadharNo).HasColumnName("aadhar_no");
            entity.Property(e => e.Address)
                .HasMaxLength(45)
                .HasColumnName("address");
            entity.Property(e => e.Cityid).HasColumnName("cityid");
            entity.Property(e => e.Email)
                .HasMaxLength(45)
                .HasColumnName("email");
            entity.Property(e => e.Fname)
                .HasMaxLength(45)
                .HasColumnName("fname");
            entity.Property(e => e.Lname)
                .HasMaxLength(45)
                .HasColumnName("lname");
            entity.Property(e => e.MobileNo).HasColumnName("mobile_no");
            entity.Property(e => e.Uid).HasColumnName("uid");

            entity.HasOne(d => d.City).WithMany(p => p.Farmers)
                .HasForeignKey(d => d.Cityid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("cityid_f");

            entity.HasOne(d => d.UidNavigation).WithMany(p => p.Farmers)
                .HasForeignKey(d => d.Uid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("uid_f");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.Oid).HasName("PRIMARY");

            entity.ToTable("order");

            entity.HasIndex(e => e.Cartid, "cartid_idx");

            entity.Property(e => e.Oid).HasColumnName("oid");
            entity.Property(e => e.Amount).HasColumnName("amount");
            entity.Property(e => e.Cartid).HasColumnName("cartid");
            entity.Property(e => e.Datetime)
                .HasColumnType("datetime")
                .HasColumnName("datetime");

            entity.HasOne(d => d.Cart).WithMany(p => p.Orders)
                .HasForeignKey(d => d.Cartid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("cartid");
        });

        modelBuilder.Entity<OrderDetail>(entity =>
        {
            entity.HasKey(e => e.Odetailid).HasName("PRIMARY");

            entity.ToTable("order_details");

            entity.HasIndex(e => e.Oid, "oid_idx");

            entity.HasIndex(e => e.Pfid, "pfid_od_idx");

            entity.Property(e => e.Odetailid).HasColumnName("odetailid");
            entity.Property(e => e.Amount).HasColumnName("amount");
            entity.Property(e => e.Oid).HasColumnName("oid");
            entity.Property(e => e.Pfid).HasColumnName("pfid");
            entity.Property(e => e.Quantity).HasColumnName("quantity");

            entity.HasOne(d => d.OidNavigation).WithMany(p => p.OrderDetails)
                .HasForeignKey(d => d.Oid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("oid");

            entity.HasOne(d => d.Pf).WithMany(p => p.OrderDetails)
                .HasForeignKey(d => d.Pfid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("pfid_od");
        });

        modelBuilder.Entity<Payment>(entity =>
        {
            entity.HasKey(e => e.Payid).HasName("PRIMARY");

            entity.ToTable("payment");

            entity.HasIndex(e => e.Oid, "oid_p_idx");

            entity.HasIndex(e => e.TransactionId, "transaction_id_UNIQUE").IsUnique();

            entity.HasIndex(e => e.Wid, "wid_p_idx");

            entity.Property(e => e.Payid).HasColumnName("payid");
            entity.Property(e => e.Amount).HasColumnName("amount");
            entity.Property(e => e.Oid).HasColumnName("oid");
            entity.Property(e => e.Paydate)
                .HasColumnType("datetime")
                .HasColumnName("paydate");
            entity.Property(e => e.Paytype)
                .HasMaxLength(45)
                .HasColumnName("paytype");
            entity.Property(e => e.TransactionId).HasColumnName("transaction_id");
            entity.Property(e => e.Wid).HasColumnName("wid");

            entity.HasOne(d => d.OidNavigation).WithMany(p => p.Payments)
                .HasForeignKey(d => d.Oid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("oid_p");

            entity.HasOne(d => d.WidNavigation).WithMany(p => p.Payments)
                .HasForeignKey(d => d.Wid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("wid_p");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.Pid).HasName("PRIMARY");

            entity.ToTable("product");

            entity.Property(e => e.Pid).HasColumnName("pid");
            entity.Property(e => e.Pname)
                .HasMaxLength(45)
                .HasColumnName("pname");
        });

        modelBuilder.Entity<ProductFarmer>(entity =>
        {
            entity.HasKey(e => e.Pfid).HasName("PRIMARY");

            entity.ToTable("product_farmer");

            entity.HasIndex(e => e.Fid, "fid_idx");

            entity.HasIndex(e => e.Pid, "pid_pf_idx");

            entity.HasIndex(e => e.Spid, "spid_idx");

            entity.Property(e => e.Pfid).HasColumnName("pfid");
            entity.Property(e => e.Fid).HasColumnName("fid");
            entity.Property(e => e.Pid).HasColumnName("pid");
            entity.Property(e => e.Price).HasColumnName("price");
            entity.Property(e => e.Quantity).HasColumnName("quantity");
            entity.Property(e => e.Spid).HasColumnName("spid");

            entity.HasOne(d => d.FidNavigation).WithMany(p => p.ProductFarmers)
                .HasForeignKey(d => d.Fid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fid");

            entity.HasOne(d => d.PidNavigation).WithMany(p => p.ProductFarmers)
                .HasForeignKey(d => d.Pid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("pid_pf");

            entity.HasOne(d => d.Sp).WithMany(p => p.ProductFarmers)
                .HasForeignKey(d => d.Spid)
                .HasConstraintName("spid");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Rid).HasName("PRIMARY");

            entity.ToTable("roles");

            entity.Property(e => e.Rid).HasColumnName("rid");
            entity.Property(e => e.Rname)
                .HasMaxLength(45)
                .HasColumnName("rname");
        });

        modelBuilder.Entity<Subproduct>(entity =>
        {
            entity.HasKey(e => e.Spid).HasName("PRIMARY");

            entity.ToTable("subproduct");

            entity.HasIndex(e => e.Pid, "pid_idx");

            entity.Property(e => e.Spid).HasColumnName("spid");
            entity.Property(e => e.Pid).HasColumnName("pid");
            entity.Property(e => e.Spname)
                .HasMaxLength(45)
                .HasColumnName("spname");

            entity.HasOne(d => d.PidNavigation).WithMany(p => p.Subproducts)
                .HasForeignKey(d => d.Pid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("pid");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Uid).HasName("PRIMARY");

            entity.ToTable("users");

            entity.HasIndex(e => e.Rid, "rid_idx");

            entity.Property(e => e.Uid).HasColumnName("uid");
            entity.Property(e => e.Pwd)
                .HasMaxLength(45)
                .HasColumnName("pwd");
            entity.Property(e => e.Rid).HasColumnName("rid");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.Username)
                .HasMaxLength(45)
                .HasColumnName("username");

            entity.HasOne(d => d.RidNavigation).WithMany(p => p.Users)
                .HasForeignKey(d => d.Rid)
                .HasConstraintName("rid");
        });

        modelBuilder.Entity<Wholesaler>(entity =>
        {
            entity.HasKey(e => e.Wid).HasName("PRIMARY");

            entity.ToTable("wholesaler");

            entity.HasIndex(e => e.Cityid, "cityid_idx");

            entity.HasIndex(e => e.MobileNo, "mobile_no_UNIQUE").IsUnique();

            entity.HasIndex(e => e.Uid, "uid_idx");

            entity.Property(e => e.Wid).HasColumnName("wid");
            entity.Property(e => e.Address)
                .HasMaxLength(45)
                .HasColumnName("address");
            entity.Property(e => e.Cityid).HasColumnName("cityid");
            entity.Property(e => e.Email)
                .HasMaxLength(45)
                .HasColumnName("email");
            entity.Property(e => e.Fname)
                .HasMaxLength(45)
                .HasColumnName("fname");
            entity.Property(e => e.GstNo)
                .HasMaxLength(45)
                .HasColumnName("gst_no");
            entity.Property(e => e.Lname)
                .HasMaxLength(45)
                .HasColumnName("lname");
            entity.Property(e => e.MobileNo).HasColumnName("mobile_no");
            entity.Property(e => e.Uid).HasColumnName("uid");

            entity.HasOne(d => d.City).WithMany(p => p.Wholesalers)
                .HasForeignKey(d => d.Cityid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("cityid_w");

            entity.HasOne(d => d.UidNavigation).WithMany(p => p.Wholesalers)
                .HasForeignKey(d => d.Uid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("uid_w");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
