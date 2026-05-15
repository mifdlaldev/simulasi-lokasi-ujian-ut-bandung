import type { StudentIdentity } from "../../types/location";
import type { StudentIdentityErrors } from "../../types/wizard";
import { FormField } from "../ui/FormField";

export interface StudentIdentityStepProps {
  errors?: StudentIdentityErrors;
  onChange: (identity: StudentIdentity) => void;
  value: StudentIdentity;
}

export function StudentIdentityStep({
  errors = {},
  onChange,
  value,
}: StudentIdentityStepProps) {
  function updateField(field: keyof StudentIdentity, fieldValue: string) {
    onChange({ ...value, [field]: fieldValue });
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <FormField
        id="student-nim"
        label="NIM"
        required
        error={errors.nim}
        helperText="Masukkan Nomor Induk Mahasiswa sesuai data akademik."
      >
        <input
          autoComplete="off"
          inputMode="numeric"
          name="nim"
          onChange={(event) => updateField("nim", event.target.value)}
          placeholder="Contoh: 042123456"
          value={value.nim}
        />
      </FormField>

      <FormField
        id="student-name"
        label="Nama Mahasiswa"
        required
        error={errors.name}
        helperText="Gunakan nama lengkap untuk memudahkan pengecekan simulasi."
      >
        <input
          autoComplete="name"
          name="name"
          onChange={(event) => updateField("name", event.target.value)}
          placeholder="Nama lengkap"
          value={value.name}
        />
      </FormField>

      <FormField
        id="student-program-study"
        label="Program Studi"
        required
        error={errors.programStudy}
        helperText="Contoh: Manajemen, PGSD, Sistem Informasi."
      >
        <input
          autoComplete="organization-title"
          name="programStudy"
          onChange={(event) => updateField("programStudy", event.target.value)}
          placeholder="Program studi"
          value={value.programStudy}
        />
      </FormField>

      <FormField
        id="student-email"
        label="Email"
        error={errors.email}
        helperText="Isi email atau nomor HP; minimal salah satu kontak wajib ada."
      >
        <input
          autoComplete="email"
          name="email"
          onChange={(event) => updateField("email", event.target.value)}
          placeholder="nama@email.com"
          type="email"
          value={value.email}
        />
      </FormField>

      <div className="sm:col-span-2">
        <FormField
          id="student-phone"
          label="Nomor Telepon / HP"
          error={errors.phone}
          helperText="Nomor ini hanya dipakai sebagai data kontak lokal pada prototype."
        >
          <input
            autoComplete="tel"
            inputMode="tel"
            name="phone"
            onChange={(event) => updateField("phone", event.target.value)}
            placeholder="08xxxxxxxxxx"
            type="tel"
            value={value.phone}
          />
        </FormField>
      </div>
    </div>
  );
}
