"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";
import { EditorialButton } from "@/components/EditorialLink";
import { STUDIO_EMAIL } from "@/lib/studio";

/**
 * The inquiry form.
 *
 * There is no inbox behind this site — no API route, no server action, no mail
 * service — so the form does not have a submitting or a sent state, because
 * neither would be true. What it has instead is a real path: it validates, then
 * composes the message and hands it to the visitor's own mail client, and says
 * plainly that nothing left the page on its own.
 *
 * The field treatment is the one written into the layout specimen in Phase 1 —
 * sentence-case label, hairline box on `--color-border-strong`, helper beneath
 * and linked by `aria-describedby`. Errors name the problem in words; the
 * colour change is only ever the second signal.
 */

const inquiryServices = [
  "Weddings",
  "Wedding Videography",
  "Events",
  "Portraits",
  "Family",
  "Commercial",
];

type FieldName =
  | "name"
  | "email"
  | "phone"
  | "service"
  | "date"
  | "location"
  | "message";

type Values = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;

const emptyValues: Values = {
  name: "",
  email: "",
  phone: "",
  service: "",
  date: "",
  location: "",
  message: "",
};

/** Order on the page, so the first thing to fix is the first thing focused. */
const fieldOrder: FieldName[] = [
  "name",
  "email",
  "phone",
  "service",
  "date",
  "location",
  "message",
];

/**
 * Deliberately loose. Anything stricter starts rejecting addresses that work —
 * and the only thing that ever really proves an address is sending to it.
 */
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Digits, spaces and the punctuation every country writes numbers with. It
 * accepts international formats because rejecting one is a far worse outcome
 * than accepting something odd in a field we only ever read by eye.
 */
const phonePattern = /^[\d+()\-.\s]{6,}$/;

function validate(values: Values): Errors {
  const errors: Errors = {};

  if (!values.name.trim()) {
    errors.name = "Please tell us your name.";
  }

  const email = values.email.trim();
  if (!email) {
    errors.email = "Please add an email address so we can write back.";
  } else if (!emailPattern.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  const phone = values.phone.trim();
  if (phone && !phonePattern.test(phone)) {
    errors.phone = "Please enter a phone number we can reach you on, or leave this empty.";
  }

  if (!values.service) {
    errors.service = "Please choose what you are looking for.";
  }

  if (!values.message.trim()) {
    errors.message = "Please tell us a little about what you have in mind.";
  }

  return errors;
}

function composeMailto(values: Values): string {
  const details = [
    `Name: ${values.name.trim()}`,
    `Email: ${values.email.trim()}`,
    values.phone.trim() ? `Phone: ${values.phone.trim()}` : null,
    `Looking for: ${values.service}`,
    values.date ? `Date: ${values.date}` : null,
    values.location.trim() ? `Location: ${values.location.trim()}` : null,
  ].filter((line): line is string => line !== null);

  const subject = `${values.service} — inquiry from ${values.name.trim()}`;
  const body = `${details.join("\n")}\n\n${values.message.trim()}\n`;

  return `mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/* -------------------------------------------------------------------------- */

const controlClass =
  "w-full border bg-transparent px-4 py-3 text-body transition-colors duration-[var(--duration-fast)] ease-editorial";

type ControlProps = {
  id: string;
  className: string;
  "aria-invalid": true | undefined;
  "aria-describedby": string | undefined;
};

/**
 * Wires one field's label, helper, error and control together.
 *
 * It exists so `aria-invalid`, `aria-describedby` and the error border are
 * derived once rather than restated across seven fields of three different
 * control types, where one of them would eventually be wrong.
 */
function Field({
  id,
  label,
  optional = false,
  help,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  help?: string;
  error?: string;
  children: (props: ControlProps) => React.ReactNode;
}) {
  const helpId = help ? `${id}-help` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [errorId, helpId].filter(Boolean).join(" ") || undefined;

  return (
    <div>
      <label htmlFor={id} className="type-label block">
        {label}
        {/* The space is load-bearing: without it the accessible name computes
            as "Phone(optional)" and is read out as one word. */}
        {optional && (
          <> <span className="ml-1 font-normal text-text-muted">(optional)</span></>
        )}
      </label>

      <div className="mt-2.5">
        {children({
          id,
          className: cn(controlClass, error ? "border-error" : "border-border-strong"),
          "aria-invalid": error ? true : undefined,
          "aria-describedby": describedBy,
        })}
      </div>

      {error && (
        <p id={errorId} className="type-helper mt-2 text-error">
          {error}
        </p>
      )}

      {help && (
        <p id={helpId} className="type-helper mt-2">
          {help}
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

export function InquiryForm({ className }: { className?: string }) {
  const uid = useId();
  const [values, setValues] = useState<Values>(emptyValues);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [ready, setReady] = useState(false);

  const fieldId = (field: FieldName) => `${uid}-${field}`;

  function update(field: FieldName, value: string) {
    const next = { ...values, [field]: value };
    setValues(next);
    // The composed message would no longer match what is on screen.
    setReady(false);
    // Only once they have seen the errors — correcting as you type is helpful,
    // being told you are wrong before you have finished typing is not.
    if (submitted) setErrors(validate(next));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);

    const found = validate(values);
    setErrors(found);

    const firstInvalid = fieldOrder.find((field) => found[field]);
    if (firstInvalid) {
      // React makes no promise that a `useId` value is a valid CSS selector,
      // so this deliberately looks the id up rather than querying for it.
      document.getElementById(fieldId(firstInvalid))?.focus();
      return;
    }

    setReady(true);
    window.location.href = composeMailto(values);
  }

  const errorCount = Object.keys(errors).length;

  return (
    <form
      noValidate
      /*
       * With JavaScript the submit handler composes a far tidier message and
       * this never runs. Without it, the declared action is still the studio's
       * address — which matters, because the default action for a form with no
       * `action` is a GET to the current URL, and that would put someone's name
       * and message into their address bar and history while sending it
       * precisely nowhere.
       */
      action={`mailto:${STUDIO_EMAIL}`}
      method="post"
      encType="text/plain"
      onSubmit={handleSubmit}
      /* Names the form without adding a hidden heading to the outline — the
         page's headings should be the ones you can actually see. */
      aria-label="Inquiry"
      className={className}
    >
      <div className="flex flex-col gap-8">
        <Field id={fieldId("name")} label="Your name" error={errors.name}>
          {(props) => (
            <input
              {...props}
              type="text"
              name="name"
              required
              autoComplete="name"
              value={values.name}
              onChange={(e) => update("name", e.target.value)}
            />
          )}
        </Field>

        <Field id={fieldId("email")} label="Email" error={errors.email}>
          {(props) => (
            <input
              {...props}
              type="email"
              name="email"
              required
              autoComplete="email"
              value={values.email}
              onChange={(e) => update("email", e.target.value)}
            />
          )}
        </Field>

        <Field id={fieldId("phone")} label="Phone" optional error={errors.phone}>
          {(props) => (
            <input
              {...props}
              type="tel"
              name="phone"
              autoComplete="tel"
              value={values.phone}
              onChange={(e) => update("phone", e.target.value)}
            />
          )}
        </Field>

        <Field
          id={fieldId("service")}
          label="What are you looking for"
          error={errors.service}
        >
          {(props) => (
            // Native select, so the listbox is the one the visitor's platform
            // already knows how to operate. Only the arrow is ours.
            <div className="relative">
              <select
                {...props}
                className={cn(props.className, "appearance-none pr-10")}
                name="service"
                required
                value={values.service}
                onChange={(e) => update("service", e.target.value)}
              >
                <option value="">Choose one</option>
                {inquiryServices.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
              <span
                aria-hidden="true"
                className="type-meta pointer-events-none absolute top-1/2 right-4 -translate-y-1/2"
              >
                &darr;
              </span>
            </div>
          )}
        </Field>

        <Field
          id={fieldId("date")}
          label="Date"
          optional
          help="Approximate is fine, and so is nothing at all."
          error={errors.date}
        >
          {(props) => (
            <input
              {...props}
              type="date"
              name="date"
              value={values.date}
              onChange={(e) => update("date", e.target.value)}
            />
          )}
        </Field>

        <Field
          id={fieldId("location")}
          label="Location"
          optional
          error={errors.location}
        >
          {(props) => (
            <input
              {...props}
              type="text"
              name="location"
              value={values.location}
              onChange={(e) => update("location", e.target.value)}
            />
          )}
        </Field>

        <Field
          id={fieldId("message")}
          label="Tell us about it"
          help="However much or little you like — we will ask the rest."
          error={errors.message}
        >
          {(props) => (
            <textarea
              {...props}
              rows={7}
              name="message"
              required
              maxLength={2000}
              value={values.message}
              onChange={(e) => update("message", e.target.value)}
            />
          )}
        </Field>
      </div>

      <div className="mt-12">
        <EditorialButton type="submit" variant="outline">
          Send your inquiry
        </EditorialButton>
      </div>

      <p role="status" className="type-helper mt-6 max-w-[46ch]">
        {ready ? (
          <>
            Your message is composed and your email app should have opened with
            it. If nothing happened, write to{" "}
            <a
              href={`mailto:${STUDIO_EMAIL}`}
              className="underline underline-offset-4 hover:no-underline"
            >
              {STUDIO_EMAIL}
            </a>{" "}
            instead — nothing has been sent from this page.
          </>
        ) : submitted && errorCount > 0 ? (
          <span className="text-error">
            {errorCount === 1
              ? "One field still needs your attention — it is described above."
              : `${errorCount} fields still need your attention — each one is described above.`}
          </span>
        ) : (
          <>
            This page has no inbox of its own. Sending opens the message in your
            own email app, so nothing you write here is stored or transmitted
            until you send it yourself.
          </>
        )}
      </p>
    </form>
  );
}
