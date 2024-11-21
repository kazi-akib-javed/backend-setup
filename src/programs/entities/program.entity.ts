import { CustomBaseEntity } from "common";
import { Column, Entity, Index } from "typeorm";

@Entity({ name: 'co_programs', schema: 'public'})
@Index(['id','appStartDate','appEndDate','requiredGpa','subject'])
export class ProgramEntity extends CustomBaseEntity {
    @Column({ name: 'university', type: 'varchar', unique: true, nullable: false })
    university: string;

    @Column({ name: 'location', type: 'varchar', unique: true, nullable: false })
    location: string;

    @Column({ name: 'degreeType', type: 'varchar', unique: false, nullable: false })
    degreeType: string;

    @Column({ name: 'subject', type: 'varchar', unique: false, nullable: false })
    subject: string;

    @Column({ name: 'required_degree', type: 'varchar', unique: false, nullable: false })
    requiredDegree: string;

    @Column({ name: 'tuition_fee', type: 'varchar', unique: false, nullable: false })
    tuitionFee: string;

    @Column({ name: 'required_gpa', type: 'varchar', unique: false, nullable: false })
    requiredGpa: string;

    @Column({ name: 'english_lang_test_score', type: 'varchar', unique: false, nullable: false })
    englishLanguageTestScore: string;

    @Column({ name: 'german_lang_test_score', type: 'varchar', unique: false, nullable: false })
    germanLanguageTestScore: string;

    @Column({ name: 'gre_score', type: 'varchar', unique: false, nullable: false })
    greScore: string;

    @Column({ name: 'application_start_date', type: 'date', unique: false, nullable: false })
    appStartDate: Date;

    @Column({ name: 'application_end_date', type: 'date', unique: false, nullable: false })
    appEndDate: Date;

    @Column({ name: 'admission_type', type: 'varchar', unique: false, nullable: false })
    admissionType: string;

    @Column({ name: 'admission_session', type: 'varchar', unique: false, nullable: false })
    admissionSession: string;

    @Column({ name: 'course_website', type: 'varchar', unique: false, nullable: false })
    courseWebsite: string;

    @Column({ name: 'apply_via', type: 'varchar', unique: false, nullable: false })
    applyVia: string;
}
