import { useMemo, useState } from "react";

import { identityStepCopy, wizardCopy } from "../../content/copy";
import { programStudyGroups } from "../../data/programStudies";
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
  const [programStudyQuery, setProgramStudyQuery] = useState(
    value.programStudy,
  );
  const [expandedFacultyCodes, setExpandedFacultyCodes] = useState<string[]>(
    [],
  );

  function updateField(field: keyof StudentIdentity, fieldValue: string) {
    onChange({ ...value, [field]: fieldValue });
  }

  function normalizeKeyword(keyword: string): string {
    return keyword.trim().toLocaleLowerCase("id-ID");
  }

  const normalizedProgramStudyQuery = normalizeKeyword(programStudyQuery);
  const hasProgramStudyQuery = normalizedProgramStudyQuery.length > 0;

  const selectedProgramStudy = useMemo(() => {
    for (const group of programStudyGroups) {
      const program = group.programs.find(
        (item) => item.name === value.programStudy,
      );

      if (program) {
        return {
          facultyCode: group.facultyCode,
          facultyName: group.facultyName,
          program,
        };
      }
    }

    return null;
  }, [value.programStudy]);

  const filteredProgramStudyGroups = useMemo(() => {
    if (!normalizedProgramStudyQuery) {
      return programStudyGroups;
    }

    return programStudyGroups
      .map((group) => {
        const facultyMatches = normalizeKeyword(
          `${group.facultyCode} ${group.facultyName}`,
        ).includes(normalizedProgramStudyQuery);
        const programs = facultyMatches
          ? group.programs
          : group.programs.filter((program) =>
              normalizeKeyword(program.name).includes(
                normalizedProgramStudyQuery,
              ),
            );

        return { ...group, programs };
      })
      .filter((group) => group.programs.length > 0);
  }, [normalizedProgramStudyQuery]);

  const filteredProgramStudyCount = filteredProgramStudyGroups.reduce(
    (total, group) => total + group.programs.length,
    0,
  );
  const programStudyStatusText = hasProgramStudyQuery
    ? filteredProgramStudyCount > 0
      ? identityStepCopy.statusFound(filteredProgramStudyCount)
      : identityStepCopy.statusNone
    : identityStepCopy.statusFaculties(filteredProgramStudyGroups.length);

  const programStudyHelperId = "student-program-study-helper";
  const programStudyErrorId = errors.programStudy
    ? "student-program-study-error"
    : undefined;
  const programStudyStatusId = "student-program-study-status";
  const programStudyDescription = [
    programStudyHelperId,
    programStudyStatusId,
    programStudyErrorId,
  ]
    .filter(Boolean)
    .join(" ");

  function selectProgramStudy(programName: string) {
    setProgramStudyQuery(programName);
    updateField("programStudy", programName);
  }

  function isFacultyExpanded(facultyCode: string): boolean {
    return (
      hasProgramStudyQuery ||
      selectedProgramStudy?.facultyCode === facultyCode ||
      expandedFacultyCodes.includes(facultyCode)
    );
  }

  function toggleFaculty(facultyCode: string) {
    setExpandedFacultyCodes((currentCodes) =>
      currentCodes.includes(facultyCode)
        ? currentCodes.filter((currentCode) => currentCode !== facultyCode)
        : [...currentCodes, facultyCode],
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <FormField
        id="student-nim"
        label={identityStepCopy.nim.label}
        required
        error={errors.nim}
        helperText={identityStepCopy.nim.helper}
      >
        <input
          autoComplete="off"
          inputMode="numeric"
          name="nim"
          onChange={(event) =>
            updateField(
              "nim",
              event.target.value.replace(/\D/g, "").slice(0, 9),
            )
          }
          pattern="[0-9]{9}"
          placeholder={identityStepCopy.nim.placeholder}
          value={value.nim}
        />
      </FormField>

      <FormField
        id="student-name"
        label={identityStepCopy.name.label}
        required
        error={errors.name}
        helperText={identityStepCopy.name.helper}
      >
        <input
          autoComplete="name"
          name="name"
          onChange={(event) => updateField("name", event.target.value)}
          placeholder={identityStepCopy.name.placeholder}
          value={value.name}
        />
      </FormField>

      <div className="space-y-3 sm:col-span-2">
        <div className="space-y-2">
          <label
            className="block text-sm font-semibold text-[var(--ut-blue-deep)]"
            htmlFor="student-program-study-search"
          >
            {identityStepCopy.programStudy.label}
            <span aria-hidden="true"> *</span>
            <span className="ut-sr-only">{wizardCopy.requiredSrOnly}</span>
          </label>
          <input
            aria-controls="student-program-study-results"
            aria-describedby={programStudyDescription}
            aria-invalid={Boolean(errors.programStudy)}
            autoComplete="off"
            className={[
              "w-full rounded-2xl border bg-white px-4 py-3 text-base text-[var(--ut-ink)] transition-colors duration-200 placeholder:text-[var(--ut-muted)] focus:border-[var(--ut-blue)] focus-visible:shadow-[var(--ut-focus-ring)]",
              errors.programStudy
                ? "border-[var(--ut-danger)]"
                : "border-[var(--ut-border-strong)]",
            ].join(" ")}
            id="student-program-study-search"
            name="programStudySearch"
            onChange={(event) => setProgramStudyQuery(event.target.value)}
            placeholder={identityStepCopy.programStudy.searchPlaceholder}
            type="search"
            value={programStudyQuery}
          />
          <p
            className="text-sm leading-6 text-[var(--ut-muted)]"
            id={programStudyHelperId}
          >
            {identityStepCopy.programStudy.helper}
          </p>
          <p
            className="text-sm leading-6 text-[var(--ut-muted)]"
            id={programStudyStatusId}
            aria-live="polite"
          >
            {programStudyStatusText}
          </p>
          {errors.programStudy ? (
            <p
              className="text-sm font-medium leading-6 text-[var(--ut-danger)]"
              id={programStudyErrorId}
              role="alert"
            >
              {errors.programStudy}
            </p>
          ) : null}
        </div>

        {selectedProgramStudy ? (
          <div className="rounded-2xl border border-[var(--ut-blue)] bg-[var(--ut-blue-soft)] px-4 py-3 text-sm leading-6 text-[var(--ut-blue-deep)]">
            {identityStepCopy.selectedPrefix}{" "}
            <strong>{selectedProgramStudy.program.name}</strong>
            <span className="ml-2 inline-flex rounded-full bg-white px-2 py-0.5 text-xs font-bold text-[var(--ut-blue)]">
              {selectedProgramStudy.facultyCode}
            </span>
          </div>
        ) : null}

        <div
          className="grid gap-4"
          id="student-program-study-results"
          aria-label={identityStepCopy.programStudy.ariaResults}
        >
          {filteredProgramStudyGroups.length > 0 ? (
            filteredProgramStudyGroups.map((group) => {
              const expanded = isFacultyExpanded(group.facultyCode);
              const panelId = `student-program-study-${group.facultyCode.toLocaleLowerCase("id-ID")}-panel`;
              const triggerId = `student-program-study-${group.facultyCode.toLocaleLowerCase("id-ID")}-trigger`;

              return (
                <section
                  className="rounded-[1.25rem] border border-[var(--ut-border)] bg-white p-3"
                  key={group.facultyCode}
                >
                  <button
                    aria-controls={panelId}
                    aria-expanded={expanded}
                    className="flex w-full items-center justify-between gap-3 rounded-2xl px-2 py-2 text-left transition-colors duration-200 hover:bg-[var(--ut-blue-soft)] focus-visible:shadow-[var(--ut-focus-ring)]"
                    id={triggerId}
                    onClick={() => toggleFaculty(group.facultyCode)}
                    type="button"
                  >
                    <span className="flex min-w-0 flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[var(--ut-yellow)] px-3 py-1 text-xs font-bold text-[var(--ut-blue-deep)]">
                        {group.facultyCode}
                      </span>
                      <span className="text-sm font-bold text-[var(--ut-blue-deep)]">
                        {group.facultyName}
                      </span>
                      <span className="text-xs font-semibold text-[var(--ut-muted)]">
                        {identityStepCopy.prodiCount(group.programs.length)}
                      </span>
                    </span>
                    <span className="shrink-0 rounded-full border border-[var(--ut-border)] bg-white px-3 py-1 text-xs font-bold text-[var(--ut-blue)]">
                      {expanded ? identityStepCopy.collapse : identityStepCopy.expand}
                    </span>
                  </button>

                  {expanded ? (
                    <div
                      aria-labelledby={triggerId}
                      className="mt-3 grid gap-2 sm:grid-cols-2"
                      id={panelId}
                    >
                      {group.programs.map((program) => {
                        const selected = program.name === value.programStudy;

                        return (
                          <button
                            aria-pressed={selected}
                            className={[
                              "min-h-12 rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-colors duration-200 focus-visible:shadow-[var(--ut-focus-ring)]",
                              selected
                                ? "border-[var(--ut-blue)] bg-[var(--ut-blue)] text-white"
                                : "border-[var(--ut-border)] bg-[var(--ut-surface)] text-[var(--ut-ink)] hover:border-[var(--ut-blue)] hover:bg-[var(--ut-blue-soft)]",
                            ].join(" ")}
                            key={program.id}
                            onClick={() => selectProgramStudy(program.name)}
                            type="button"
                          >
                            <span>{program.name}</span>
                            <span
                              className={
                                selected
                                  ? "mt-1 block text-xs text-white/80"
                                  : "mt-1 block text-xs text-[var(--ut-muted)]"
                              }
                            >
                              {selected
                                ? identityStepCopy.selectedLabel
                                : identityStepCopy.selectPrompt(group.facultyCode)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  ) : null}
                </section>
              );
            })
          ) : (
            <p className="rounded-2xl border border-dashed border-[var(--ut-border-strong)] bg-white px-4 py-5 text-sm text-[var(--ut-muted)]">
              {identityStepCopy.emptyResults}
            </p>
          )}
        </div>
      </div>

      <FormField
        id="student-email"
        label={identityStepCopy.email.label}
        required
        error={errors.email}
        helperText={identityStepCopy.email.helper}
      >
        <input
          autoComplete="email"
          name="email"
          onChange={(event) => updateField("email", event.target.value)}
          pattern="^[^\s@]+@gmail\.com$"
          placeholder={identityStepCopy.email.placeholder}
          type="email"
          value={value.email}
        />
      </FormField>

      <FormField
        id="student-phone"
        label={identityStepCopy.phone.label}
        required
        error={errors.phone}
        helperText={identityStepCopy.phone.helper}
      >
        <input
          autoComplete="tel"
          inputMode="numeric"
          name="phone"
          onChange={(event) =>
            updateField(
              "phone",
              event.target.value.replace(/\D/g, "").slice(0, 12),
            )
          }
          pattern="[0-9]{0,12}"
          placeholder={identityStepCopy.phone.placeholder}
          type="tel"
          value={value.phone}
        />
      </FormField>
    </div>
  );
}
